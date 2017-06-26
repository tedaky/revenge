import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailPageAdminComponent } from './detail.page.admin.component';

import { DetailPageAdminRoutingModule } from './detail.page.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        DetailPageAdminRoutingModule
    ],
    declarations: [
        DetailPageAdminComponent
    ]
})
export class DetailPageAdminModule { }
