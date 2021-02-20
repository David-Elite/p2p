import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Category } from '../category.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CategoryService } from '../category.service';

@Injectable({
  providedIn: 'root'
})
export class ListCategoryResolver implements Resolve<boolean> {
  categories: Category[] = [];
  onCategoriesChanged: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  constructor(private categoryService: CategoryService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.categoryService.getCategories().subscribe( cats => {
        console.log(cats);
        if (cats) {
          this.categories = cats;
          this.onCategoriesChanged.next(cats);
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
