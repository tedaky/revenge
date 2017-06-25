import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPageAdminComponent } from './add.page.admin.component';

import { AddPageAdminRoutingModule } from './add.page.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        AddPageAdminRoutingModule
    ],
    declarations: [
        AddPageAdminComponent
    ]
})
export class AddPageAdminModule { }
