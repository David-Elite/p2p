import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Zone } from '../zone.modal';
import { ZoneService } from '../zone.service';
import { ZoneFormResolver } from './zone-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ZoneFormComponent implements OnInit, OnDestroy {

  zone: Zone;
  pageType: string;
  zoneForm: FormGroup;
  selectedImages: any = [];
  zones: Zone[] = [];
  sort: Zone[] = [];
  zoneValue = '';




  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ZoneFormResolver} zoneFormResolver
   * @param {ZoneService} zoneService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private zoneFormResolver: ZoneFormResolver,
    private zoneService: ZoneService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {

    this.getZones();
    // Set the default
    this.zone = new Zone();
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
    // Subscribe to update zone on changes
    this.zoneFormResolver.onZoneChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(zone => {
        if (zone) {
          this.zone = new Zone(zone);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.zone = new Zone();
        }

        this.zoneForm = this.createZoneForm();
        this.zoneValue = zone.zoneType;
        this.zoneForm.get('zoneType').valueChanges.subscribe(val => this.zoneValue = val);
      });
    // this.zoneForm.get('zone').valueChanges.subscribe( val => {
    //   if (val === 'Continent') {

    //   }
    // })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.zoneFormResolver.zone = null;
    this.zoneFormResolver.onZoneChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create zone form
   *
   * @returns {FormGroup}
   */
  createZoneForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.zone.id],
      zoneType: [this.zone.zoneType],
      title: [this.zone.title],
      handle: [this.zone.handle],
      tags: [this.zone.tags],
      continent: [this.zone.continent],
      country: [this.zone.country],
      state: [this.zone.state],
      city: [this.zone.city],
      images: [this.zone.images],
      active: [this.zone.active],
    });
  }


  /**
   * Save zone
   */
  saveZone(): void {
    const data = this.zoneForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.title);

    this.zoneService.saveZone(data)
      .then(() => {

        // Trigger the subscription with new data
        this.zoneFormResolver.onZoneChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Zone saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }
  // Get zones


  getZones(): void {
    this.zoneService.getZones().subscribe(res => {
      this.zones = res;
    });
  }

  // getZones(){
  //  this.zoneService.getZones().subscribe(res=> {
  //   const temp = res.filter(r => (r.id !== this.zone.id && r.parent !== this.zone.id));
  //   this.zoneSort(temp);
  //  });
  // }


  // zoneSort(unsortZones: Zone[]){
  //   this.zones = [];
  //   unsortZones.filter(z => (z.parent === null || z.parent === '')).forEach( z => {
  //     const temp = this.getPnC(z, unsortZones);
  //     this.zones.push(...temp);
  //   });
  // }

  // getPnC(z: Zone, unsortZones: Zone[]): Zone[] {
  //   const zn: Zone[] = [];
  //   zn.push(z);
  //   unsortZones.filter(uz => uz.parent === z.id).forEach( zon => {
  //     // zn.push(zon);
  //     zn.push(...this.getPnC(zon, unsortZones));
  //   });
  //   return zn;
  // }


  /**
   * Add zone
   */
  addZone(): void {
    const data = this.zoneForm.getRawValue();
    data.handle = FuseUtils.handleize(data.zone);

    this.zoneService.addZone(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.zoneFormResolver.onZoneChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Zone added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the Location with new one
        this.location.replaceState('zones/' + id);
      });
  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.zoneService.saveImages(this.zone.id, this.selectedImages).then(() => {
      this.selectedImages = [];
      this.zoneService.getZone(this.zone.id).subscribe(res => {
        this.zoneFormResolver.onZoneChanged.next(res);
        this.zoneFormResolver.zone = res;
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Images added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    });
  }

  removeImage(image: string): void {
    this.fuseProgressBarService.show();
    this.zoneService.removeImage(this.zone.id, image).then(() => {
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Image Deleted', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }
}

