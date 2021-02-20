import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneFormComponent } from './zone-form/zone-form.component';
import { ZoneFormResolver } from './zone-form/zone-form.resolver';
import { ListZoneComponent } from './list-zone/list-zone.component';
import { ListZoneResolver } from './list-zone/list-zone.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-zone',
    pathMatch: 'full',
  },
  {
    path: 'list-zone',
    component: ListZoneComponent,
    resolve: {
      data: ListZoneResolver
    }
  },
  {
    path: 'zone-form/:id',
    component: ZoneFormComponent,
    resolve: {
      data: ZoneFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneRoutingModule { }
