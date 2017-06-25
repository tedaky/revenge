import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPageAdminComponent } from './add.page.admin.component';

const addPageAdminRoutes: Routes = [
    {
        path: '',
        component: AddPageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(addPageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AddPageAdminRoutingModule { }
