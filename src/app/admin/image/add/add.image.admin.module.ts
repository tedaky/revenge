import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddImageAdminComponent } from './add.image.admin.component';

import { AddImageAdminRoutingModule } from './add.image.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AddImageAdminRoutingModule
    ],
    declarations: [
        AddImageAdminComponent
    ]
})
export class AddImageAdminModule { }