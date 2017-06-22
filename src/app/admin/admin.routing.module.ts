import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'image',
                loadChildren: 'app/admin/image/image.admin.module#ImageAdminModule'
            },
            {
                path: 'page',
                loadChildren: 'app/admin/page/page.admin.module#PageAdminModule'
            },
            {
                path: '',
                loadChildren: 'app/admin/dashboard/dashboard.admin.module#DashboardAdminModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }