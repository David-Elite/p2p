import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { LandingPage } from './landing-page.modal';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getLandingPage(landingPageId: string): Observable<LandingPage> {
    return this.httpClient.get<any>(`${this.host}/landing_page/${landingPageId}`)
      .pipe<LandingPage>(map(c => {
        const cat: LandingPage = new LandingPage({
          id: c.id,
          title: c.title,
          handle: c.handle,
          subtitle: c.subtitle,
          description: c.description,
          metaTitle: c.meta_title,
          metaDesc: c.meta_description,
          metaKeywords: c.meta_keywords ? c.meta_keywords.split(',') : [],
          images: c.images ? c.images : [],
          section: c.section ? c.section.sort((a, b) => a.position - b.position) : [],
          active: c.active ? c.active : false,
          coverImage: c.cover_image
        });
        return cat;

      }));
  }


  getCompleteLandingPages(): Observable<LandingPage[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/landing_page`)
      .pipe<LandingPage[]>(map(ca => ca.map(c => {
        const cat: LandingPage = new LandingPage({
          id: c.id,
          title: c.title,
          handle: c.handle,
          subtitle: c.subtitle,
          description: c.description,
          metaTitle: c.meta_title,
          metaDesc: c.meta_description,
          metaKeywords: c.meta_keywords ? c.meta_keywords.split(',') : [],
          images: c.images ? c.images : [],
          active: c.active ? c.active : false,
          coverImage: c.cover_image
        });
        return cat;

      })));
  }

  getLandingPages(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/landing_page`)
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

  addLandingPage(data: LandingPage): Promise<string> {
    return new Promise((res, rej) => this.httpClient.post(`${this.host}/landing_page`,
      {
        id: data.id,
        title: data.title,
        handle: data.handle,
        subtitle: data.subtitle,
        description: data.description,
        active: data.active,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        metaKeywords: data.metaKeywords.toString(),
      }
    ).subscribe(result => res(data.id))
    );
  }

  saveLandingPage(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => this.httpClient.put(`${this.host}/landing_page/${id}`,
      data
    ).subscribe(result => res(data.id),
                err => rej(err))
    );
  }

  deleteLandingPage(landingPageId: string): Promise<void> {
    return new Promise((req, res) => {
      this.httpClient.delete(`${this.host}/landing_page/${landingPageId}`).subscribe(() => res());
    });
  }

  saveImages(id: string, images: FileList): Promise<void> {
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${this.host}/landing_page/image`, formData));
    }
    return new Promise((res, rej) => forkJoin(observables).pipe(take(1)).subscribe(done => res(), err => rej(err)));
  }

  removeImage(id: string, imageId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/landing_page/${id}/images/${imageId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  getPackages(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/landing_page/packages`)
      .pipe<any[]>(map(ca => ca.map(c => {
        const cat = {
          id: c.id,
          image: c.image,
          title: c.title,
          duration: `${c.days}D/${c.nights}N`,
          priceWithTax: `₹${c.price_with_tax}${c.price_unit ? '/' + c.price_unit : ''}`,
          reviewPoints: c.review_points,
          reviewCount: c.review_count
        };
        return cat;
      })));
  }

  addSection(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/landing_page/${id}/section`, data).pipe(take(1))
      .subscribe(
        sec => {
          console.log(sec);
          res(sec['insertId']);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editSection(id: string, secId: string, data: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/landing_page/${id}/section/${secId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteSection(id: string, secId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/landing_page/${id}/section/${secId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  updateSectionPosition(id: string, sections: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/landing_page/${id}/section/position`, {sections: sections})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  getSection(id: string, secId: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${this.host}/landing_page/${id}/section/${secId}`).subscribe(
        sec => res(sec),
        err => rej(err)
      );
    });
  }

  addPackageToSection(id: string, secId: string, packageId: string, position: number): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/landing_page/${id}/section/${secId}/package`, {
        sectionId: secId,
        packageId: packageId,
        position: position
      }).pipe(take(1))
      .subscribe(
        () => {
          res();
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  updatePackagePosition(id: string, secId: string, packages: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/landing_page/${id}/section/${secId}/package/position`, {packages: packages})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  addFAQ(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/landing_page/${id}/faq`, data).pipe(take(1))
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
      this.httpClient.put(`${this.host}/landing_page/${id}/faq/${faqId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteFAQ(id: string, faqId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/landing_page/${id}/faq/${faqId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  addMisc(id: string, data: any): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/landing_page/${id}/misc`, data).pipe(take(1))
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
      this.httpClient.put(`${this.host}/landing_page/${id}/misc/${miscId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteMisc(id: string, miscId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/landing_page/${id}/misc/${miscId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  addLink(id: string, secId: string, data: any, icon: File): Promise<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }

    
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/landing_page/${id}/section/${secId}/link`, formData).pipe(take(1))
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

  editLink(id: string, secId: string, linkId: string, data: any, icon: File): Promise<void> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/landing_page/${id}/section/${secId}/link/${linkId}`, formData).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteLink(id: string, secId: string, linkId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/landing_page/${id}/section/${secId}/link/${linkId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }
}
