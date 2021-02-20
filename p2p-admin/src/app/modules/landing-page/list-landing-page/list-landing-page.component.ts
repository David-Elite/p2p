import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ListLandingPageResolver } from './list-landing-page.resolver';

@Component({
  selector: 'app-list-landing-page',
  templateUrl: './list-landing-page.component.html',
  styleUrls: ['./list-landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ListLandingPageComponent implements OnInit {

  dataSource: FilesDataSource | null;
  displayedColumns = ['id', 'image', 'title', 'active'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild('filter', { static: true })
  filter: ElementRef;

  // Private
  private unsubscribeAll: Subject<any>;

  constructor(
    private listLandingPageResolver: ListLandingPageResolver
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this.listLandingPageResolver, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }

        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class FilesDataSource extends DataSource<any>
{
  private filterChange = new BehaviorSubject('');
  private filteredDataChange = new BehaviorSubject('');

  /**
   * Constructor
   *
   * @param {LandingPagesService} LandingPageService
   * @param {MatPaginator} matPaginator
   * @param {MatSort} matSort
   */
  constructor(
    private listLandingPageResolver: ListLandingPageResolver,
    private matPaginator: MatPaginator,
    private matSort: MatSort
  ) {
    super();

    this.filteredData = this.listLandingPageResolver.landingPages;
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.listLandingPageResolver.onLandingPagesChanged,
      this.matPaginator.page,
      this.filterChange,
      this.matSort.sortChange
    ];

    return merge(...displayDataChanges)
      .pipe(
        map(() => {
          let data = this.listLandingPageResolver.landingPages.slice();

          data = this.filterData(data);

          this.filteredData = [...data];

          data = this.sortData(data);

          // Grab the page's slice of data.
          const startIndex = this.matPaginator.pageIndex * this.matPaginator.pageSize;
          return data.splice(startIndex, this.matPaginator.pageSize);
        }
        ));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this.filteredDataChange.value;
  }

  set filteredData(value: any) {
    this.filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data): any {
    if (!this.filter) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data): any[] {
    if (!this.matSort.active || this.matSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.matSort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'priceWithTax':
          [propertyA, propertyB] = [a.priceWithTax, b.priceWithTax];
          break;
        case 'active':
          [propertyA, propertyB] = [a.active, b.active];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.matSort.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void {

  }

}

