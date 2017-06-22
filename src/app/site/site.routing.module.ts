import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteComponent } from './site.component';

const siteRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: ':slug',
                component: SiteComponent
            },
            {
                path: '',
                component: SiteComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(siteRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SiteRoutingModule { }