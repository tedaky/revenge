import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardImageAdminComponent } from './dashboard.image.admin.component';

import { DashboardImageAdminRoutingModule } from './dashboard.image.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardImageAdminRoutingModule
    ],
    declarations: [
        DashboardImageAdminComponent
    ]
})
export class DashboardImageAdminModule { }