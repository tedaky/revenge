import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteComponent } from './site.component';
import { NavSiteComponent } from './nav/nav.site.component';
import { SiteRoutingModule } from './site.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SiteRoutingModule
    ],
    declarations: [
        SiteComponent,
        NavSiteComponent
    ]
})
export class SiteModule { }