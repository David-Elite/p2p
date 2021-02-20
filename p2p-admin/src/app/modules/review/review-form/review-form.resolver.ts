import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ReviewService } from 'app/modules/review/review.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Review } from '../review.modal';

@Injectable({
  providedIn: 'root'
})
export class ReviewFormResolver implements Resolve<boolean> {
  review: Review;
  onReviewChanged: BehaviorSubject<Review> = new BehaviorSubject(null);

  constructor(private reviewService: ReviewService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.reviewService.getReview(route.params.id).subscribe(prod => {
          this.review = prod;
          this.onReviewChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
