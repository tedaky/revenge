import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardImageAdminComponent } from './dashboard.image.admin.component';

const dashboardImageAdminRoutes: Routes = [
    {
        path: '',
        component: DashboardImageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardImageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardImageAdminRoutingModule { }