import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
    },
    {
        path: '',
        loadChildren: 'app/site/site.module#SiteModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }