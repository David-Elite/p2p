import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Home } from '../home.modal';
import { HomeService } from '../home.service';
import { HomeFormResolver } from './home-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';
import { CategoryService } from 'app/modules/category/category.service';
import { Category } from 'app/modules/category/category.modal';
import { Zone } from 'app/modules/zone/zone.modal';
import { ZoneService } from 'app/modules/zone/zone.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class HomeFormComponent implements OnInit, OnDestroy {

  @ViewChild('addLink') addLink;

  home: Home;
  pageType: string;
  homeForm: FormGroup;
  selectedImages: any = [];
  categories: Category[] = [];
  zones: Zone[] = [];
  aminities = [];
  active = 0;

  // Section Vars
  section;
  sectionId = '';
  sectionTitle = '';
  sectionSubtitle = '';
  sectionContentType = '';
  sectionDisplayType = '';

  // Links Vars
  linkId = '';
  linkTitle = '';
  linkSubtitle = '';
  linkUrl = '';
  linkIcon: File;
  displayIcon: string | ArrayBuffer = '';

  // Package Vars
  allPkgList = [];
  dispPkgList = [];
  selectedPkgs = [];
  searchPkg = '';

  // Zone Vars
  
  zoneType = '';
  zoneHead = '';


  // FAQ Vars
  faqId = '';
  faqQues = '';
  faqAns = '';

  // Misc Vars
  miscId = '';
  miscTitle = '';
  miscContent = '';

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {HomeFormResolver} homeFormResolver
   * @param {HomeService} homeService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private homeFormResolver: HomeFormResolver,
    private homeService: HomeService,
    private categoryService: CategoryService,
    private zoneService: ZoneService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService,
    private matDialog: MatDialog
  ) {
    // Set the default
    this.home = new Home();

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
    // Subscribe to update home on changes
    this.homeFormResolver.onHomeChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(home => {
        if (home) {
          this.home = new Home(home);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.home = new Home();
        }

        this.homeForm = this.createHomeForm();
      });
    this.homeService.getPackages().subscribe(pkgs => {
      console.log(pkgs);
      this.allPkgList = pkgs;
      this.dispPkgList = pkgs;
    });
  }

  // zoneSort(unsortZones: Zone[]): void {
  //   this.zones = [];
  //   unsortZones.filter(z => (z.parent === null || z.parent === '')).forEach(z => {
  //     const temp = this.getPnC(z, unsortZones);
  //     this.zones.push(...temp);
  //   });
  // }

  // getPnC(z: Zone, unsortZones: Zone[]): Zone[] {
  //   const zn: Zone[] = [];
  //   zn.push(z);
  //   unsortZones.filter(uz => uz.parent === z.id).forEach(zon => {
  //     zn.push(...this.getPnC(zon, unsortZones));
  //   });
  //   return zn;
  // }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.homeFormResolver.home = null;
    this.homeFormResolver.onHomeChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create home form
   *
   * @returns {FormGroup}
   */
  createHomeForm(): FormGroup {
    console.log(this.home);
    return this.formBuilder.group({
      metaTitle: [this.home.metaTitle],
      metaDesc: [this.home.metaDesc],
      metaKeywords: [this.home.metaKeywords],
    });
  }

  getDirtyValues(form: any): any {
    const dirtyValues = {};

    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];
        if (currentControl.dirty) {
          if (currentControl.controls) {
            dirtyValues[key] = this.getDirtyValues(currentControl);
          } else {
            dirtyValues[key] = currentControl.value;
          }
        }
      });
    return dirtyValues;
  }

  /**
   * Save home
   */
  saveHome(): void {
    // const data = this.homeForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.title);

    const data = this.getDirtyValues(this.homeForm);
    console.log(data);

    this.homeService.saveHome(data)
      .then(() => {

        // Trigger the subscription with new data
        this.homeFormResolver.onHomeChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Package saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  uploadImages(event: any, type: string): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.homeService.saveImages(this.selectedImages, type).then(() => {
      this.selectedImages = [];
      this.homeService.getHome().subscribe(res => {
        this.homeFormResolver.onHomeChanged.next(res);
        this.homeFormResolver.home = res;
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Images added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    })
      .catch(err => {
        console.log(err);
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Occurred', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  removeImage(imageId: string): void {
    this.fuseProgressBarService.show();
    this.homeService.removeImage(imageId).then(() => {
      this.homeService.getHome().subscribe(res => {
        this.homeFormResolver.onHomeChanged.next(res);
        this.homeFormResolver.home = res;
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Image Deleted', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    });

  }

  addSection(): void {
    this.fuseProgressBarService.show();
    if (!this.sectionId || this.sectionId === '') {
      this.homeService.addSection({
        title: this.sectionTitle,
        subtitle: this.sectionSubtitle,
        contentType: this.sectionContentType,
        displayType: this.sectionDisplayType,
        position: this.home.section.length + 1
      })
        .then(() => {
          this.section = null;
          this.sectionId = '';
          this.sectionTitle = '';
          this.sectionSubtitle = '';
          this.sectionContentType = '';
          this.sectionDisplayType = '';
          this.homeService.getHome().subscribe(res => {
            this.homeFormResolver.onHomeChanged.next(res);
            this.homeFormResolver.home = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Section Added', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          });
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    } else {
      this.homeService.editSection(this.sectionId, {
        title: this.sectionTitle,
        subtitle: this.sectionSubtitle,
      }).then(() => {
        this.clearSection();
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Section Saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      }).catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Saving Section', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    }
    
  }

  updateSectionSequence(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.home.section, event.previousIndex, event.currentIndex);
    this.homeService.updateSectionPosition(this.home.section);
  }

  saveSection(): void {
    this.fuseProgressBarService.show();
    this.homeService.editSection(this.sectionId, {
      title: this.sectionTitle,
      subtitle: this.sectionSubtitle,
    }).then(() => {
      this.clearSection();
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Section Saved', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    }).catch(err => {
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Some Error Saving Section', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

  editSection(secId: string, el: HTMLElement): void {
    this.sectionId = secId;
    this.fuseProgressBarService.show();
    this.homeService.getSection(secId)
      .then(section => {
        console.log(section);
        this.section = section;
        this.sectionTitle = section?.title;
        this.sectionSubtitle = section?.subtitle;
        this.sectionContentType = section?.content_type;
        this.sectionDisplayType = section?.display_type;
        this.selectedPkgs = section.packages
        .map( p => ({...this.allPkgList.find(pa => pa.id === p.package_id), position: p.position}))
        .sort((a, b) => a.position - b.position);
        console.log(this.selectedPkgs);
        el.scrollIntoView({behavior: 'smooth'});
        this.fuseProgressBarService.hide();
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Fetching Section', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  clearSection(): void {
    this.section = null;
    this.sectionId = '';
    this.sectionTitle = '';
    this.sectionSubtitle = '';
    this.sectionContentType = '';
    this.sectionDisplayType = '';
  }

  deleteSection(secId: string): void {
    this.fuseProgressBarService.show();
    this.homeService.deleteSection(secId)
      .then(() => {
        this.homeService.getHome().subscribe(res => {
          this.homeFormResolver.onHomeChanged.next(res);
          this.homeFormResolver.home = res;
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('FAQ Deleted', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Occured', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  uploadLinkIcon(event: any): void {
    this.linkIcon = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.linkIcon);
    reader.onload = (_event) => {
      this.displayIcon = reader.result;
    };
  }

  openAddLink(): void {
    this.matDialog.open(this.addLink).afterClosed().subscribe(res => {
      if (res) {
        this.saveLink('section', this.sectionId);
      }
    });
  }

  saveLink(type: string, referenceId: string): void {
    this.fuseProgressBarService.show();
    if (this.linkId === '' || this.linkId === null) {
      this.homeService.addLink(type, referenceId, {
        title: this.linkTitle,
        subtitle: this.linkSubtitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkSubtitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          if (type === 'section') {
            this.homeService.getSection(this.sectionId)
            .then(section => {
              this.section = section;
              this.sectionTitle = section?.title;
              this.sectionSubtitle = section?.subtitle;
              this.sectionContentType = section?.content_type;
              this.sectionDisplayType = section?.display_type;
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Link Added in Section', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            })
            .catch(err => {
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Some Error Fetching Section', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            });
          } else if (type === 'home') {
            this.homeService.getHome()
            .subscribe(home => {
              this.homeFormResolver.onHomeChanged.next(home);
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Link Added in Home Slider', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            });
          }
          
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    } else {
      this.homeService.editLink('section', this.sectionId, this.linkId, {
        title: this.linkTitle,
        subtitle: this.linkSubtitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkSubtitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.homeService.getHome().subscribe(res => {
            this.homeFormResolver.onHomeChanged.next(res);
            this.homeFormResolver.home = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Link Updated', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          });
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    }
  }

  editLink(linkId: string, type: string): void {
    this.linkId = linkId;
    var link: any;
    if (type === 'section') {
      link = this.section.links.find(m => m.id === linkId);
    } else {
      link = this.home.sliderLinks.find(m => m.id === linkId);
    }
    this.linkTitle = link?.title;
    this.linkSubtitle = link?.subtitle;
    this.linkUrl = link?.url;
    this.displayIcon = link?.icon;
    this.linkIcon = null;
    if (type === 'section') {
      this.matDialog.open(this.addLink).afterClosed().subscribe(res => {
        if (res) {
          this.saveLink(type, this.sectionId);
        }
      });
    }
    
  }


  clearLink(): void {
    this.linkId = '';
    this.linkTitle = '';
    this.linkSubtitle = '';
    this.linkIcon = null;
    this.displayIcon = '';
    this.linkUrl = '';
  }

  deleteLink(linkId: string, type: string): void {
    this.fuseProgressBarService.show();
    this.homeService.deleteLink(linkId)
      .then(() => {
        if (type === 'section') {
          this.homeService.getSection(this.sectionId)
            .then(section => {
              this.section = section;
              this.sectionTitle = section?.title;
              this.sectionSubtitle = section?.subtitle;
              this.sectionContentType = section?.content_type;
              this.sectionDisplayType = section?.display_type;
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Link Deleted', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            })
            .catch(err => {
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Some Error while Deleting the Link', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            });
        } else {
          this.homeService.getHome().subscribe(res => {
            this.homeFormResolver.onHomeChanged.next(res);
            this.homeFormResolver.home = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Link Deleted', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          },
          err => {
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Some Error while Deleting the Link', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          });
        }
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Occured', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  handleTabChange(event: any): void {
    this.active = event.index;
  }

  filterPackages(): void {
    this.dispPkgList = FuseUtils.filterArrayByString(this.allPkgList, this.searchPkg);
  }

  addToSelection(pkgId: string): void {
    const pkg = this.allPkgList.find(p => p.id === pkgId);
    const pos = this.selectedPkgs.length + 1;
    this.selectedPkgs.push({...pkg, position: pos});
    this.homeService.addPackageToSection(this.sectionId, pkg.id, pos);
  }

  updateProductSequence(event): void {
    moveItemInArray(this.selectedPkgs, event.previousIndex, event.currentIndex);
    this.homeService.updatePackagePosition(this.sectionId, this.selectedPkgs);
  }

  removePkgFromSelection(pkgId): void {
    
  }

  isSelectedPkg(pkgId: string): boolean {
    return (this.selectedPkgs.findIndex(p => (p.id === pkgId)) !== -1);
  }



}

