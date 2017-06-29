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
                path: 'edit',
                children: [
                    {
                        path: ':id',
                        loadChildren: 'app/admin/image/edit/edit.image.admin.module#EditImageAdminModule'
                    }
                ]
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
