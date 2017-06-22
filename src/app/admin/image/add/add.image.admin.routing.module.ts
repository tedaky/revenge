import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddImageAdminComponent } from './add.image.admin.component';

const addImageAdminRoutes: Routes = [
    {
        path: '',
        component: AddImageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(addImageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AddImageAdminRoutingModule { }