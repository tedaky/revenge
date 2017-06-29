import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditImageAdminComponent } from './edit.image.admin.component';

const editImageAdminRoutes: Routes = [
    {
        path: '',
        component: EditImageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(editImageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EditImageAdminRoutingModule { }
