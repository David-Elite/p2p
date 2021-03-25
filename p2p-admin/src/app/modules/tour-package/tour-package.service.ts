import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { TourPackage } from './tour-package.modal';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getTourPackage(tourPackageId: string): Observable<TourPackage> {
    return this.httpClient.get<any>(`${this.host}/tour_packages/${tourPackageId}`)
      .pipe<TourPackage>(map(c => {
        const cat: TourPackage = new TourPackage({
          id: c.id,
          title: c.title,
          handle: c.handle,
          days: c.days,
          nights: c.nights,
          shortDescription: c.short_description,
          description: c.description,
          category: c.category,
          continent: c.continent,
          country: c.country,
          state: c.state,
          city: c.city,
          region: c.region,
          videoUrl: c.video_url,
          price: c.price,
          taxPercent: c.tax_percent,
          priceWithTax: c.price_with_tax,
          comparedPrice: c.compared_price,
          priceUnit: c.price_unit,
          tags: c.tags ? c.tags.split(',') : [],
          highlights: c.highlights ? c.highlights.split(',') : [],
          ribbonTag: c.ribbon_tag,
          bookingForm: c.booking_form ? c.booking_form : false,
          inquiryForm: c.inquiry_form ? c.inquiry_form : false,
          aminities: c.aminities ? c.aminities.split(',') : [],
          ripType: c.trip_type ? c.trip_type.split(',') : [],
          metaTitle: c.meta_title,
          metaDesc: c.meta_description,
          metaKeywords: c.meta_keywords ? c.meta_keywords.split(',') : [],
          images: c.images ? c.images : [],
          itinerary: c.itinerary ? c.itinerary : [],
          misc: c.misc ? c.misc : [],
          faq: c.faq ? c.faq : [],
          link: c.link ? c.link : [],
          active: c.active ? c.active : false,
          coverImage: c.cover_image
        });
        return cat;

      }));
  }


  getCompleteTourPackages(): Observable<TourPackage[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/tour_packages`)
      .pipe<TourPackage[]>(map(ca => ca.map(c => {
        const cat: TourPackage = new TourPackage({
          id: c.id,
          title: c.title,
          handle: c.handle,
          days: c.days,
          nights: c.nights,
          shortDescription: c.short_description,
          description: c.description,
          category: c.category,
          continent: c.continent,
          country: c.country,
          state: c.state,
          city: c.city,
          region: c.region,
          videoUrl: c.video_url,
          price: c.price,
          taxPercent: c.tax_percent,
          priceWithTax: c.price_with_tax,
          comparedPrice: c.compared_price,
          priceUnit: c.price_unit,
          tags: c.tags ? c.tags.split(',') : [],
          highlights: c.highlights ? c.highlights.split(',') : [],
          ribbonTag: c.ribbon_tag,
          bookingForm: c.booking_form ? c.booking_form : false,
          inquiryForm: c.inquiry_form ? c.inquiry_form : false,
          aminities: c.aminities ? c.aminities.split(',') : [],
          tripType: c.trip_type ? c.trip_type.split(',') : [],
          metaTitle: c.meta_title,
          metaDesc: c.meta_description,
          metaKeywords: c.meta_keywords ? c.meta_keywords.split(',') : [],
          images: c.images ? c.images : [],
          itinerary: c.itinerary ? c.itinerary : [],
          misc: c.misc ? c.misc : [],
          faq: c.faq ? c.faq : [],
          link: c.link ? c.link : [],
          active: c.active ? c.active : false,
        });
        return cat;

      })));
  }

  getTourPackages(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/tour_packages`)
      .pipe<any[]>(map(ca => ca.map(c => {
        const cat = {
          id: c.id,
          image: c.image,
          title: c.title,
          duration: `${c.days}D/${c.nights}N`,
          category: c.category,
          place: `${c.continent}/${c.country}/${c.state}/${c.city}/${c.region}`,
          priceWithTax: `₹${c.price_with_tax}${c.price_unit ? '/' + c.price_unit : ''}`,
          metaTitle: c.meta_title,
          metaDesc: c.meta_description,
          metaKeywords: c.meta_keywords ? c.meta_keywords.split(',') : [],
          active: c.active ? c.active : false
        };
        return cat;

      })));
  }

  addTourPackage(data: TourPackage): Promise<string> {
    return new Promise((res, rej) => this.httpClient.post(`${this.host}/tour_packages`,
      {
        id: data.id,
        title: data.title,
        handle: data.handle,
        days: data.days,
        nights: data.nights,
        shortDescription: data.shortDescription,
        description: data.description,
        category: data.category,
        continent: data.continent,
        country: data.country,
        state: data.country,
        city: data.city,
        region: data.region,
        videoUrl: data.videoUrl,
        price: data.price,
        taxPercent: data.taxPercent,
        priceWithTax: data.priceWithTax,
        comparedPrice: data.comparedPrice,
        priceUnit: data.priceUnit,
        tags: data.tags.toString(),
        highlights: data.highlights.toString(),
        ribbonTag: data.ribbonTag,
        bookingForm: data.bookingForm,
        inquiryForm: data.inquiryForm,
        aminities: data.aminities.toString(),
        tripType: data.tripType.toString(),
        active: data.active,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        metaKeywords: data.metaKeywords.toString(),
      }
    ).subscribe(result => res(data.id))
    );
  }

  saveTourPackage(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => this.httpClient.put(`${this.host}/tour_packages/${id}`,
      data
    ).subscribe(result => res(data.id),
                err => rej(err))
    );
  }

  copyTourPackage(id: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/tour_packages/copy/${id}/${FuseUtils.generateGUID()}`, {}).subscribe({
        next: result => {
          console.log(result);
          res(result);
        },
        error: err => rej(err)
      });
    });
  }

  deleteTourPackage(tourPackageId: string): Promise<void> {
    return new Promise((req, res) => {
      this.httpClient.delete(`${this.host}/tour_packages/${tourPackageId}`).subscribe(() => res());
    });
  }

  saveImages(id: string, images: FileList): Promise<void> {
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${this.host}/tour_packages/image`, formData));
    }
    return new Promise((res, rej) => forkJoin(observables).pipe(take(1)).subscribe(done => res(), err => rej(err)));
  }

  removeImage(id: string, imageId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/tour_packages/${id}/images/${imageId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  addItinerary(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/tour_packages/${id}/itinerary`, data).pipe(take(1))
      .subscribe(
        iti => {
          res(iti);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editItinerary(id: string, itiId: string, data: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/tour_packages/${id}/itinerary/${itiId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteItinerary(id: string, itiId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/tour_packages/${id}/itinerary/${itiId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  addFAQ(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/tour_packages/${id}/faq`, data).pipe(take(1))
      .subscribe(
        iti => {
          res(iti);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editFAQ(id: string, faqId: string, data: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/tour_packages/${id}/faq/${faqId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteFAQ(id: string, faqId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/tour_packages/${id}/faq/${faqId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  addMisc(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/tour_packages/${id}/misc`, data).pipe(take(1))
      .subscribe(
        msc => {
          res(msc);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editMisc(id: string, miscId: string, data: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/tour_packages/${id}/misc/${miscId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteMisc(id: string, miscId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/tour_packages/${id}/misc/${miscId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  addLink(id: string, data: any, icon: File): Promise<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }

    
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/tour_packages/${id}/link`, formData).pipe(take(1))
      .subscribe(
        msc => {
          res(msc);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editLink(id: string, linkId: string, data: any, icon: File): Promise<void> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/tour_packages/${id}/link/${formData}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteLink(id: string, linkId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/tour_packages/${id}/link/${linkId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }
}
