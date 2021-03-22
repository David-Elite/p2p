import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TourPackage } from '../tour-package.modal';
import { TourPackageService } from '../tour-package.service';
import { TourPackageFormResolver } from './tour-package-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';
import { CategoryService } from 'app/modules/category/category.service';
import { Category } from 'app/modules/category/category.modal';
import { Zone } from 'app/modules/zone/zone.modal';
import { ZoneService } from 'app/modules/zone/zone.service';

@Component({
  selector: 'app-tourPackage-form',
  templateUrl: './tour-package-form.component.html',
  styleUrls: ['./tour-package-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TourPackageFormComponent implements OnInit, OnDestroy {

  tourPackage: TourPackage;
  pageType: string;
  tourPackageForm: FormGroup;
  selectedImages: any = [];
  categories: Category[] = [];
  zones: Zone[] = [];
  aminities = [
    'Activities',
    'Bonfire',
    'Camping',
    'Days',
    'Meals',
    'Pickup',
    'Wifi'
  ];
  active = 0;

  // Itinerary Vars
  itiId = '';
  itiTitle = '';
  itiContent = '';

  // FAQ Vars
  faqId = '';
  faqQues = '';
  faqAns = '';

  // Misc Vars
  miscId = '';
  miscTitle = '';
  miscContent = '';

  // Links Vars
  linkId = '';
  linkTitle = '';
  linkUrl = '';
  linkIcon: File;
  displayIcon: string | ArrayBuffer = '';

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {TourPackageFormResolver} tourPackageFormResolver
   * @param {TourPackageService} tourPackageService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private tourPackageFormResolver: TourPackageFormResolver,
    private tourPackageService: TourPackageService,
    private categoryService: CategoryService,
    private zoneService: ZoneService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {
    // Set the default
    this.tourPackage = new TourPackage();

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
    // Subscribe to update tourPackage on changes
    this.tourPackageFormResolver.onTourPackageChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(tourPackage => {
        if (tourPackage) {
          this.tourPackage = new TourPackage(tourPackage);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.tourPackage = new TourPackage();
        }

        this.tourPackageForm = this.createTourPackageForm();
        this.tourPackageForm.get('price').valueChanges.subscribe(val => {
          const taxPercent = this.tourPackageForm.get('taxPercent').value;
          if (taxPercent && taxPercent !== 0) {
            this.tourPackageForm.get('priceWithTax').setValue(val + (val * taxPercent / 100));
            this.tourPackageForm.get('priceWithTax').markAsDirty();
          } else {
            this.tourPackageForm.get('priceWithTax').setValue(val);
            this.tourPackageForm.get('priceWithTax').markAsDirty();
          }
        });
        this.tourPackageForm.get('taxPercent').valueChanges.subscribe(val => {
          const price = this.tourPackageForm.get('price').value;
          if (price && price !== 0) {
            this.tourPackageForm.get('priceWithTax').setValue(price + (price * val / 100));
            this.tourPackageForm.get('priceWithTax').markAsDirty();
          }
        });
      });
    this.categoryService.getCategories().subscribe(cats => this.categories = cats);
    this.zoneService.getZones().subscribe(zones => this.zones = zones); // this.zoneSort(zones));
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
    this.tourPackageFormResolver.tourPackage = null;
    this.tourPackageFormResolver.onTourPackageChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create tourPackage form
   *
   * @returns {FormGroup}
   */
  createTourPackageForm(): FormGroup {
    console.log(this.tourPackage);
    return this.formBuilder.group({
      id: [this.tourPackage.id],
      title: [this.tourPackage.title],
      handle: [this.tourPackage.handle],
      days: [this.tourPackage.days],
      nights: [this.tourPackage.nights],
      description: [this.tourPackage.description],
      category: [this.tourPackage.category],
      continent: [this.tourPackage.continent],
      country: [this.tourPackage.country],
      state: [this.tourPackage.state],
      city: [this.tourPackage.city],
      region: [this.tourPackage.region],
      price: [this.tourPackage.price],
      taxPercent: [this.tourPackage.taxPercent],
      priceWithTax: [{value: this.tourPackage.priceWithTax, disabled: true}],
      comparedPrice: [this.tourPackage.comparedPrice],
      priceUnit: [this.tourPackage.priceUnit],
      tags: [this.tourPackage.tags],
      highlights: [this.tourPackage.highlights],
      ribbonTag: [this.tourPackage.ribbonTag],
      bookingForm: [this.tourPackage.bookingForm],
      inquiryForm: [this.tourPackage.inquiryForm],
      aminities: [this.tourPackage.aminities],
      metaTitle: [this.tourPackage.metaTitle],
      metaDesc: [this.tourPackage.metaDesc],
      metaKeywords: [this.tourPackage.metaKeywords],
      active: [this.tourPackage.active],
      coverImage: [this.tourPackage.coverImage]
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
   * Save tourPackage
   */
  saveTourPackage(): void {
    // const data = this.tourPackageForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.title);

    const data = this.getDirtyValues(this.tourPackageForm);
    if (data.aminities) {
      data.aminities = data.aminities.toString();
    }

    this.tourPackageService.saveTourPackage(this.tourPackage.id, data)
      .then(() => {

        // Trigger the subscription with new data
        this.tourPackageFormResolver.onTourPackageChanged.next(this.tourPackageForm.getRawValue());

        // Show the success message
        this.matSnackBar.open('Package saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  /**
   * Add tourPackage
   */
  addTourPackage(): void {
    const data = this.tourPackageForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);
    data.aminities = data.aminities.toString();
    this.tourPackageService.addTourPackage(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.tourPackageFormResolver.onTourPackageChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Package added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the Location with new one
        this.location.replaceState('tourPackages/' + id);
      });
  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.tourPackageService.saveImages(this.tourPackage.id, this.selectedImages).then(() => {
      this.selectedImages = [];
      this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
        this.tourPackageFormResolver.onTourPackageChanged.next(res);
        this.tourPackageFormResolver.tourPackage = res;
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
    this.tourPackageService.removeImage(this.tourPackage.id, imageId).then(() => {
      this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
        this.tourPackageFormResolver.onTourPackageChanged.next(res);
        this.tourPackageFormResolver.tourPackage = res;
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Image Deleted', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    });

  }

  saveItinerary(): void {
    this.fuseProgressBarService.show();
    console.log(this.itiId);
    if (this.itiId === '' || this.itiId === null) {
      this.tourPackageService.addItinerary(this.tourPackage.id, {
        title: this.itiTitle,
        details: this.itiContent
      })
        .then(() => {
          this.itiId = '';
          this.itiTitle = '';
          this.itiContent = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Itinerary Added', 'OK', {
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
      this.tourPackageService.editItinerary(this.tourPackage.id, this.itiId, {
        title: this.itiTitle,
        details: this.itiContent
      })
        .then(() => {
          this.itiId = '';
          this.itiTitle = '';
          this.itiContent = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Itinerary Updated', 'OK', {
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

  editItinerary(itiId: string): void {
    console.log(itiId);
    this.itiId = itiId;
    const iti = this.tourPackage.itinerary.find(itr => itr.id === itiId);
    this.itiTitle = iti?.title;
    this.itiContent = iti?.details;
  }

  clearItinerary(): void {
    this.itiId = '';
    this.itiTitle = '';
    this.itiContent = '';
  }

  deleteItinerary(itiId: string): void {
    this.fuseProgressBarService.show();
    this.tourPackageService.deleteItinerary(this.tourPackage.id, itiId)
      .then(() => {
        this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
          this.tourPackageFormResolver.onTourPackageChanged.next(res);
          this.tourPackageFormResolver.tourPackage = res;
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Itinerary Deleted', 'OK', {
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
      this.tourPackageService.addFAQ(this.tourPackage.id, {
        ques: this.faqQues,
        ans: this.faqAns
      })
        .then(() => {
          this.faqId = '';
          this.faqQues = '';
          this.faqAns = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
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
      this.tourPackageService.editFAQ(this.tourPackage.id, this.faqId, {
        ques: this.faqQues,
        ans: this.faqAns
      })
        .then(() => {
          this.faqId = '';
          this.faqQues = '';
          this.faqAns = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
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
    const faq = this.tourPackage.faq.find(f => f.id === faqId);
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
    this.tourPackageService.deleteFAQ(this.tourPackage.id, faqId)
      .then(() => {
        this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
          this.tourPackageFormResolver.onTourPackageChanged.next(res);
          this.tourPackageFormResolver.tourPackage = res;
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
      this.tourPackageService.addMisc(this.tourPackage.id, {
        title: this.miscTitle,
        content: this.miscContent
      })
        .then(() => {
          this.miscId = '';
          this.miscTitle = '';
          this.miscContent = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
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
      this.tourPackageService.editMisc(this.tourPackage.id, this.miscId, {
        title: this.miscTitle,
        content: this.miscContent
      })
        .then(() => {
          this.miscId = '';
          this.miscTitle = '';
          this.miscContent = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
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
    const misc = this.tourPackage.misc.find(m => m.id === miscId);
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
    this.tourPackageService.deleteMisc(this.tourPackage.id, miscId)
      .then(() => {
        this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
          this.tourPackageFormResolver.onTourPackageChanged.next(res);
          this.tourPackageFormResolver.tourPackage = res;
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

  saveLink(): void {
    this.fuseProgressBarService.show();
    if (this.miscId === '' || this.miscId === null) {
      this.tourPackageService.addLink(this.tourPackage.id, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Link Added', 'OK', {
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
      this.tourPackageService.editLink(this.tourPackage.id, this.linkId, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
            this.tourPackageFormResolver.onTourPackageChanged.next(res);
            this.tourPackageFormResolver.tourPackage = res;
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
    const link = this.tourPackage.link.find(m => m.id === linkId);
    this.linkTitle = link?.title;
    this.linkUrl = link?.url;
    this.displayIcon = link?.icon;
    this.linkIcon = null;
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
    this.tourPackageService.deleteLink(this.tourPackage.id, linkId)
      .then(() => {
        this.tourPackageService.getTourPackage(this.tourPackage.id).subscribe(res => {
          this.tourPackageFormResolver.onTourPackageChanged.next(res);
          this.tourPackageFormResolver.tourPackage = res;
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
    this.tourPackageForm.get('coverImage').setValue(imageId);
    this.tourPackageForm.get('coverImage').markAsDirty();
  }

  handleTabChange(event: any): void {
    this.active = event.index;
  }

  filterContinent(zn): boolean {
    return zn.zone === 'Continent';
  }

  filterCountry(zn): boolean {
    return (zn.zone === 'Country'); // && zn.continent === this.tourPackageForm.get('continent').value);
  }

}

