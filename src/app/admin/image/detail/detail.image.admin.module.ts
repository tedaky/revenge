import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailImageAdminComponent } from './detail.image.admin.component';

import { DetailImageAdminRoutingModule } from './detail.image.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        DetailImageAdminRoutingModule
    ],
    declarations: [
        DetailImageAdminComponent
    ]
})
export class DetailImageAdminModule { }