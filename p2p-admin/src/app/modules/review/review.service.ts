import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Review } from './review.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getReview(reviewId: string): Observable<Review> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<any>(`${environment.host}/review/${reviewId}`,{headers:header})
      .pipe<Review>(map(c => {
        const cat: Review = new Review({
          id: c.id,
          referenceId: c.reference_id,
          reviewDate: c.review_date,
          reviewTitle: c.review_title,
          reviewContent: c.review_content,
          upvoteCount: c.upvote_count,
          reviewerImage: c.reviewer_image,
          reviewerName: c.reviewer_name,
          reviewerTitle: c.reviewer_title,
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      }));
  }


  getReviews(): Observable<any[]> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<any[]>(`${environment.host}/review`,{headers:header})
      .pipe<any[]>(map(ca => ca.map(c => {
        const rev = {
          id: c.id,
          packageName: c.package_name,
          reviewTitle: c.review_title,
          reviewPoints: c.review_points,
          reviewerImage: c.reviewer_image,
          reviewerName: c.reviewer_name,
          images: c.images ? c.images : [],
          active: true
        };
        return rev;

      })));
  }

  getPackagesForReview(): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.get(`${environment.host}/review/packages`,{headers:header})
      .subscribe(result => res(result),
                  err => rej(err))
    );
  }

  addReview(data: Review, img: File): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const formData = new FormData();
    formData.append('file', img, img.name);
    formData.append('referenceId', data.referenceId);
    formData.append('reviewTitle', data.reviewTitle);
    formData.append('reviewContent', data.reviewContent);
    formData.append('reviewerId', data.reviewerId);
    formData.append('reviewPoints', data.reviewPoints.toString());
    formData.append('reviewerName', data.reviewerName);
    formData.append('reviewerTitle', data.reviewerTitle);

    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/review`, formData,{headers:header})
      .subscribe(result => {
        res();
      },
      err => rej(err))
    );

  }

  saveReview(data: any, img: File): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const formData = new FormData();
    formData.append('file', img, img.name);
    formData.append('referenceId', data.referenceId);
    formData.append('reviewTitle', data.reviewTitle);
    formData.append('reviewContent', data.reviewContent);
    formData.append('reviewerId', data.reviewerId);
    formData.append('reviewDate', data.reviewDate.toString());
    formData.append('reviewPoints', data.reviewPoints.toString());
    formData.append('reviewerName', data.reviewerName);
    formData.append('reviewerTitle', data.reviewerTitle);

    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/review/${data.id}`,
      formData
   ,{headers:header} ).subscribe(result => res(data.id))
    );
  }

  deleteReview(reviewId: string): Promise<void> {
    return Promise.resolve();
  }

  saveImages(id: string, images: FileList): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const promises = [];
    // tslint:disable-next-line:prefer-for-of
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${environment.host}/review/image`, formData,{headers:header}));
    }
    return forkJoin(observables).toPromise();
  }
  removeImage(id: string, imageId: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/review/images/${imageId}`,{headers:header})
        .subscribe(
          () => res(),
          err => rej(err)
        );
    });
  }
}
