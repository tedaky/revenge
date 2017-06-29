import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPageAdminComponent } from './edit.page.admin.component';

const editPageAdminRoutes: Routes = [
    {
        path: '',
        component: EditPageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(editPageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EditPageAdminRoutingModule { }
