import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const imageAdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'add',
                loadChildren: 'app/admin/image/add/add.image.admin.module#AddImageAdminModule'
            },
            {
                path: ':id',
                loadChildren: 'app/admin/image/detail/detail.image.admin.module#DetailImageAdminModule'
            },
            {
                path: '',
                loadChildren: 'app/admin/image/dashboard/dashboard.image.admin.module#DashboardImageAdminModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(imageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ImageAdminRoutingModule { }