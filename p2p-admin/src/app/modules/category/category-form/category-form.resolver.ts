import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { CategoryService } from 'app/modules/category/category.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from '../category.modal';

@Injectable({
  providedIn: 'root'
})
export class CategoryFormResolver implements Resolve<boolean> {
  category: Category;
  onCategoryChanged: BehaviorSubject<Category> = new BehaviorSubject(null);

  constructor(private categoryService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.categoryService.getCategory(route.params.id).subscribe(prod => {
          this.category = prod;
          this.onCategoryChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
