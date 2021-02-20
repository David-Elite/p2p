import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Review } from '../review.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReviewService } from '../review.service';

@Injectable({
  providedIn: 'root'
})
export class ListReviewResolver implements Resolve<boolean> {
  reviews: Review[] = [];
  onReviewsChanged: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);
  constructor(private reviewService: ReviewService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.reviewService.getReviews().subscribe( review => {
        console.log(review);
        if (review) {
          this.reviews = review;
          this.onReviewsChanged.next(review);
        }
        res(true);
        // return true;
      },
      err => {
        console.log(err);
        res(false);
      });
    });
  }
}
