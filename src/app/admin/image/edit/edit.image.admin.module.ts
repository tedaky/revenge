import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditImageAdminComponent } from './edit.image.admin.component';

import { EditImageAdminRoutingModule } from './edit.image.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        EditImageAdminRoutingModule
    ],
    declarations: [
        EditImageAdminComponent
    ]
})
export class EditImageAdminModule { }
