import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Home } from './home.modal';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getHome(): Observable<Home> {
    return this.httpClient.get<any>(`${this.host}/home`)
      .pipe<Home>(map(c => {
        console.log(c);
        const cat: Home = new Home({
          metaTitle: c.title,
          metaDesc: c.description,
          metaKeywords: c.keywords ? c.keywords.split(',') : [],
          sliderImages: c.slider_images ? c.slider_images : [],
          sliderLinks: c.slider_links ? c.slider_links : [],
          section: c.section ? c.section.sort((a, b) => a.position - b.position) : []
        });
        return cat;

      }));
  }

  saveHome(data: any): Promise<any> {
    return new Promise((res, rej) => this.httpClient.put(`${this.host}/home`,
      data
    ).subscribe(result => res(data.id),
                err => rej(err))
    );
  }

  saveImages(images: FileList, type: string): Promise<void> {
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      // formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${this.host}/image/home/${type}`, formData));
    }
    return new Promise((res, rej) => forkJoin(observables).pipe(take(1)).subscribe(done => res(), err => rej(err)));
  }

  removeImage(imageId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/image/${imageId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  getPackages(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/home/packages`)
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

  addSection(data: any): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/home/section`, data).pipe(take(1))
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

  editSection(secId: string, data: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/home/section/${secId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteSection(secId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/home/section/${secId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  updateSectionPosition(sections: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/home/section/position`, {sections: sections})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  getSection(secId: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${this.host}/home/section/${secId}`).subscribe(
        sec => res(sec),
        err => rej(err)
      );
    });
  }

  addPackageToSection(secId: string, packageId: string, position: number): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/home/section/${secId}/package`, {
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

  updatePackagePosition(secId: string, packages: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/home/section/${secId}/package/position`, {packages: packages})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  addLink(type: string, refId: string, data: any, icon: File): Promise<any> {
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/link/${type}/${refId}`, formData).pipe(take(1))
      .subscribe(
        link => {
          res(link);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editLink(type: string, refId: string, linkId: string, data: any, icon: File): Promise<void> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/link/${type}/${refId}/${linkId}`, formData).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteLink(linkId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/link/${linkId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }
}
