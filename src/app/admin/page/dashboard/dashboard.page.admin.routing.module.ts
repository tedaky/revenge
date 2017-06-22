import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPageAdminComponent } from './dashboard.page.admin.component';

const dashboardPageAdminRoutes: Routes = [
    {
        path: '',
        component: DashboardPageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardPageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardPageAdminRoutingModule { }