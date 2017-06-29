import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPageAdminComponent } from './edit.page.admin.component';

import { EditPageAdminRoutingModule } from './edit.page.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        EditPageAdminRoutingModule
    ],
    declarations: [
        EditPageAdminComponent
    ]
})
export class EditPageAdminModule { }
