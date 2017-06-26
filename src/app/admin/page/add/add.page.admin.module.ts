import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddPageAdminComponent } from './add.page.admin.component';

import { AddPageAdminRoutingModule } from './add.page.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AddPageAdminRoutingModule
    ],
    declarations: [
        AddPageAdminComponent
    ]
})
export class AddPageAdminModule { }
