import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewFormResolver } from './review-form/review-form.resolver';
import { ListReviewComponent } from './list-review/list-review.component';
import { ListReviewResolver } from './list-review/list-review.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-review',
    pathMatch: 'full',
  },
  {
    path: 'list-review',
    component: ListReviewComponent,
    resolve: {
      data: ListReviewResolver
    }
  },
  {
    path: 'review-form/:id',
    component: ReviewFormComponent,
    resolve: {
      data: ReviewFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
