import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailImageAdminComponent } from './detail.image.admin.component';

const detailImageAdminRoutes: Routes = [
    {
        path: '',
        component: DetailImageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(detailImageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DetailImageAdminRoutingModule { }