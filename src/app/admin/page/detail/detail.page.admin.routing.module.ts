import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailPageAdminComponent } from './detail.page.admin.component';

const detailPageAdminRoutes: Routes = [
    {
        path: '',
        component: DetailPageAdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(detailPageAdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DetailPageAdminRoutingModule { }
