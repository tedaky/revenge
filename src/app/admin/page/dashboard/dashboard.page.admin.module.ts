import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageAdminComponent } from './dashboard.page.admin.component';

import { DashboardPageAdminRoutingModule } from './dashboard.page.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardPageAdminRoutingModule
    ],
    declarations: [
        DashboardPageAdminComponent
    ]
})
export class DashboardPageAdminModule { }