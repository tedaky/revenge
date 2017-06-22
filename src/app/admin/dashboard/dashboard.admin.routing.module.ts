import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardAdminComponent } from './dashboard.admin.component';

const dashboardAdminRoutes: Routes = [
    {
        path: '',
        component: DashboardAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardAdminRoutingModule { }