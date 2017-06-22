import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const pageAdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: 'app/admin/page/dashboard/dashboard.page.admin.module#DashboardPageAdminModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(pageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PageAdminRoutingModule { }