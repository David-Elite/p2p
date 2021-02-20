import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandingPage } from '../landing-page.modal';
import { LandingPageService } from '../landing-page.service';
import { LandingPageFormResolver } from './landing-page-form.resolver';
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
  selector: 'app-landingPage-form',
  templateUrl: './landing-page-form.component.html',
  styleUrls: ['./landing-page-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LandingPageFormComponent implements OnInit, OnDestroy {

  @ViewChild('addLink') addLink;

  landingPage: LandingPage;
  pageType: string;
  landingPageForm: FormGroup;
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
   * @param {LandingPageFormResolver} landingPageFormResolver
   * @param {LandingPageService} landingPageService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private landingPageFormResolver: LandingPageFormResolver,
    private landingPageService: LandingPageService,
    private categoryService: CategoryService,
    private zoneService: ZoneService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService,
    private matDialog: MatDialog
  ) {
    // Set the default
    this.landingPage = new LandingPage();

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
    // Subscribe to update landingPage on changes
    this.landingPageFormResolver.onLandingPageChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(landingPage => {
        if (landingPage) {
          this.landingPage = new LandingPage(landingPage);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.landingPage = new LandingPage();
        }

        this.landingPageForm = this.createLandingPageForm();
      });
    this.landingPageService.getPackages().subscribe(pkgs => {
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
    this.landingPageFormResolver.landingPage = null;
    this.landingPageFormResolver.onLandingPageChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create landingPage form
   *
   * @returns {FormGroup}
   */
  createLandingPageForm(): FormGroup {
    console.log(this.landingPage);
    return this.formBuilder.group({
      id: [this.landingPage.id],
      title: [this.landingPage.title],
      handle: [this.landingPage.handle],
      subtitle: [this.landingPage.subtitle],
      description: [this.landingPage.description],
      metaTitle: [this.landingPage.metaTitle],
      metaDesc: [this.landingPage.metaDesc],
      metaKeywords: [this.landingPage.metaKeywords],
      active: [this.landingPage.active],
      coverImage: [this.landingPage.coverImage]
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
   * Save landingPage
   */
  saveLandingPage(): void {
    // const data = this.landingPageForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.title);

    const data = this.getDirtyValues(this.landingPageForm);
    console.log(data);

    this.landingPageService.saveLandingPage(this.landingPage.id, data)
      .then(() => {

        // Trigger the subscription with new data
        this.landingPageFormResolver.onLandingPageChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Package saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  /**
   * Add landingPage
   */
  addLandingPage(): void {
    const data = this.landingPageForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

    this.landingPageService.addLandingPage(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.landingPageFormResolver.onLandingPageChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Package added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the Location with new one
        this.location.replaceState('landingPages/' + id);
      });
  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.landingPageService.saveImages(this.landingPage.id, this.selectedImages).then(() => {
      this.selectedImages = [];
      this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
        this.landingPageFormResolver.onLandingPageChanged.next(res);
        this.landingPageFormResolver.landingPage = res;
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
    this.landingPageService.removeImage(this.landingPage.id, imageId).then(() => {
      this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
        this.landingPageFormResolver.onLandingPageChanged.next(res);
        this.landingPageFormResolver.landingPage = res;
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
      this.landingPageService.addSection(this.landingPage.id, {
        title: this.sectionTitle,
        subtitle: this.sectionSubtitle,
        contentType: this.sectionContentType,
        displayType: this.sectionDisplayType,
        position: this.landingPage.section.length + 1
      })
        .then(() => {
          this.section = null;
          this.sectionId = '';
          this.sectionTitle = '';
          this.sectionSubtitle = '';
          this.sectionContentType = '';
          this.sectionDisplayType = '';
          this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
            this.landingPageFormResolver.onLandingPageChanged.next(res);
            this.landingPageFormResolver.landingPage = res;
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
      this.landingPageService.editSection(this.landingPage.id, this.sectionId, {
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
    moveItemInArray(this.landingPage.section, event.previousIndex, event.currentIndex);
    this.landingPageService.updateSectionPosition(this.landingPage.id, this.landingPage.section);
  }

  saveSection(): void {
    this.fuseProgressBarService.show();
    this.landingPageService.editSection(this.landingPage.id, this.sectionId, {
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
    this.landingPageService.getSection(this.landingPage.id, secId)
      .then(section => {
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
    this.landingPageService.deleteSection(this.landingPage.id, secId)
      .then(() => {
        this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
          this.landingPageFormResolver.onLandingPageChanged.next(res);
          this.landingPageFormResolver.landingPage = res;
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

  saveFAQ(): void {
    this.fuseProgressBarService.show();
    if (this.faqId === '' || this.faqId === null) {
      this.landingPageService.addFAQ(this.landingPage.id, {
        ques: this.faqQues,
        ans: this.faqAns
      })
        .then(() => {
          this.faqId = '';
          this.faqQues = '';
          this.faqAns = '';
          this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
            this.landingPageFormResolver.onLandingPageChanged.next(res);
            this.landingPageFormResolver.landingPage = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('FAQ Added', 'OK', {
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
      this.landingPageService.editFAQ(this.landingPage.id, this.faqId, {
        ques: this.faqQues,
        ans: this.faqAns
      })
        .then(() => {
          this.faqId = '';
          this.faqQues = '';
          this.faqAns = '';
          this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
            this.landingPageFormResolver.onLandingPageChanged.next(res);
            this.landingPageFormResolver.landingPage = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('FAQ Updated', 'OK', {
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

  editFAQ(faqId: string): void {
    this.faqId = faqId;
    const faq = this.landingPage.faq.find(f => f.id === faqId);
    this.faqQues = faq?.ques;
    this.faqAns = faq?.ans;
  }

  clearFAQ(): void {
    this.faqId = '';
    this.faqQues = '';
    this.faqAns = '';
  }

  deleteFAQ(faqId: string): void {
    this.fuseProgressBarService.show();
    this.landingPageService.deleteFAQ(this.landingPage.id, faqId)
      .then(() => {
        this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
          this.landingPageFormResolver.onLandingPageChanged.next(res);
          this.landingPageFormResolver.landingPage = res;
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

  saveMisc(): void {
    this.fuseProgressBarService.show();
    if (this.miscId === '' || this.miscId === null) {
      this.landingPageService.addMisc(this.landingPage.id, {
        title: this.miscTitle,
        content: this.miscContent
      })
        .then(() => {
          this.miscId = '';
          this.miscTitle = '';
          this.miscContent = '';
          this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
            this.landingPageFormResolver.onLandingPageChanged.next(res);
            this.landingPageFormResolver.landingPage = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Miscellaneous Added', 'OK', {
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
      this.landingPageService.editMisc(this.landingPage.id, this.miscId, {
        title: this.miscTitle,
        content: this.miscContent
      })
        .then(() => {
          this.miscId = '';
          this.miscTitle = '';
          this.miscContent = '';
          this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
            this.landingPageFormResolver.onLandingPageChanged.next(res);
            this.landingPageFormResolver.landingPage = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Miscellaneous Updated', 'OK', {
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

  editMisc(miscId: string): void {
    this.miscId = miscId;
    const misc = this.landingPage.misc.find(m => m.id === miscId);
    this.miscTitle = misc?.title;
    this.miscContent = misc?.content;
  }
  clearMisc(): void {
    this.miscId = '';
    this.miscTitle = '';
    this.miscContent = '';
  }

  deleteMisc(miscId: string): void {
    this.fuseProgressBarService.show();
    this.landingPageService.deleteMisc(this.landingPage.id, miscId)
      .then(() => {
        this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
          this.landingPageFormResolver.onLandingPageChanged.next(res);
          this.landingPageFormResolver.landingPage = res;
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Miscellaneous Deleted', 'OK', {
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
        this.saveLink();
      }
    });
  }

  saveLink(): void {
    this.fuseProgressBarService.show();
    if (this.linkId === '' || this.linkId === null) {
      console.log(this.sectionId);
      this.landingPageService.addLink(this.landingPage.id, this.sectionId, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.fuseProgressBarService.show();
          this.landingPageService.getSection(this.landingPage.id, this.sectionId)
            .then(section => {
              console.log(section);
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
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    } else {
      this.landingPageService.editLink(this.landingPage.id, this.sectionId, this.linkId, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
            this.landingPageFormResolver.onLandingPageChanged.next(res);
            this.landingPageFormResolver.landingPage = res;
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

  editLink(linkId: string): void {
    this.linkId = linkId;
    const link = this.landingPage.link.find(m => m.id === linkId);
    this.linkTitle = link?.title;
    this.linkUrl = link?.url;
    this.displayIcon = link?.icon;
    this.linkIcon = null;
    this.matDialog.open(this.addLink).afterClosed().subscribe(res => {
      if (res) {
        this.saveLink();
      }
    });
  }


  clearLink(): void {
    this.linkId = '';
    this.linkTitle = '';
    this.linkIcon = null;
    this.displayIcon = '';
    this.linkUrl = '';
  }

  deleteLink(linkId: string): void {
    this.fuseProgressBarService.show();
    this.landingPageService.deleteLink(this.landingPage.id, this.sectionId, linkId)
      .then(() => {
        this.landingPageService.getLandingPage(this.landingPage.id).subscribe(res => {
          this.landingPageFormResolver.onLandingPageChanged.next(res);
          this.landingPageFormResolver.landingPage = res;
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Link Deleted', 'OK', {
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

  makeCoverImage(imageId: string): void {
    this.landingPageForm.get('coverImage').setValue(imageId);
    this.landingPageForm.get('coverImage').markAsDirty();
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
    this.landingPageService.addPackageToSection(this.landingPage.id, this.sectionId, pkg.id, pos);
  }

  updateProductSequence(event): void {
    moveItemInArray(this.selectedPkgs, event.previousIndex, event.currentIndex);
    this.landingPageService.updatePackagePosition(this.landingPage.id, this.sectionId, this.selectedPkgs);
  }

  removePkgFromSelection(pkgId): void {
    
  }

  isSelectedPkg(pkgId: string): boolean {
    return (this.selectedPkgs.findIndex(p => (p.id === pkgId)) !== -1);
  }



}

