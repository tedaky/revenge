import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const pageAdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'add',
                loadChildren: 'app/admin/page/add/add.page.admin.module#AddPageAdminModule'
            },
            {
                path: 'edit',
                children: [
                    {
                        path: ':id',
                        loadChildren: 'app/admin/page/edit/edit.page.admin.module#EditPageAdminModule'
                    }
                ]
            },
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
