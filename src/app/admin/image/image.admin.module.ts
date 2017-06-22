import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAdminRoutingModule } from './image.admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ImageAdminRoutingModule
    ]
})
export class ImageAdminModule { }