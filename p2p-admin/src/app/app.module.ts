import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/login/login.module';
import { CategoryModule } from './modules/category/category.module';
import { ZoneModule } from './modules/zone/zone.module';
import { TourPackageModule } from './modules/tour-package/tour-package.module';
import { LandingPageModule } from './modules/landing-page/landing-page.module';
import { AdminuserModule } from './modules/admin-user/admin-user.module';
import { JobModule } from './modules/job/job.module';
import { ReviewModule } from './modules/review/review.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        
        AppRoutingModule,
        RouterModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        LoginModule,
        CategoryModule,
        LandingPageModule,
        ZoneModule,
        TourPackageModule,
        ReviewModule,
        JobModule,
        AdminuserModule,
        NgbModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
