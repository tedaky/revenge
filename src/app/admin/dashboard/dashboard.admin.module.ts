import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminComponent } from './dashboard.admin.component';
import { DashboardAdminRoutingModule } from './dashboard.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardAdminRoutingModule
    ],
    declarations: [
        DashboardAdminComponent
    ]
})
export class DashboardAdminModule { }