import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSections(refId: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/sections/${refId}`).subscribe(
        sec => {
          res(sec);
        },
        err => rej(err)
      );
    });
  }

  getPackages(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${environment.host}/home/packages`)
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
      this.httpClient.post(`${environment.host}/home/section`, data).pipe(take(1))
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
      this.httpClient.put(`${environment.host}/home/section/${secId}`, data).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteSection(secId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/home/section/${secId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  updateSectionPosition(sections: any): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/section/position`, {sections: sections})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  getSection(secId: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/section/${secId}`).subscribe(
        sec => res(sec),
        err => rej(err)
      );
    });
  }

  addPackageToSection(secId: string, packageId: string, position: number): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/section/${secId}/package`, {
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
      this.httpClient.put(`${environment.host}/section/${secId}/package/position`, {packages: packages})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  addLink(refId: string, data: any, icon: File): Promise<any> {
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/link/section/${refId}`, formData).pipe(take(1))
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

  editLink(refId: string, linkId: string, data: any, icon: File): Promise<void> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/link/section/${refId}/${linkId}`, formData).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteLink(linkId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/link/${linkId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  addZone(refId: string, zoneId: string, zoneList: string[]): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/zone/section/title/${refId}/${zoneId}`, {}).pipe(take(1)).subscribe(
        (result) => {
          const parent = result['insertId'];
          this.httpClient.post(`${environment.host}/zone/section/child/${refId}/${parent}`, {zoneList}).pipe(take(1))
          .subscribe(
            () => {
              res(true);
            },
            err => {
              rej(err);
            }
          );
        },
        (error) => {
          rej(error);
        }  
      );
    });
  }

  editZoneGrid(refId: string, gridId: string, zoneList: string[]): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/zone/section/child/${refId}/${gridId}`, {zoneList}).pipe(take(1)).subscribe(
        (result) => {
          res(true);
        },
        (error) => {
          rej(error);
        }  
      );
    });
  }

  deleteZoneGrid(gridId: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/zone/section/${gridId}`).pipe(take(1)).subscribe(
        (result) => res(true),
        (error) => rej(error)
      );
    })
  }
}
