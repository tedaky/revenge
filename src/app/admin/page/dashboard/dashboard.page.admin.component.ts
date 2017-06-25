import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router'

import { PageAdmin, PageAdminList, PageAdminMessage } from '../page.admin';
import { PageAdminService } from '../page.admin.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-page-admin-component',
    templateUrl: 'dashboard.page.admin.template.html',
    styleUrls: ['dashboard.page.admin.component.scss'],
    providers: [ PageAdminService ]
})

export class DashboardPageAdminComponent {
    pages: PageAdmin[];
    pageMessage?: PageAdminMessage;
    sub: any;

    constructor(private pageService: PageAdminService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.pages = [
            {
                page_id: 1,
                page_title: 'Home Page',
                page_slug: 'home'
            },
            {
                page_id: 2,
                page_title: 'About Page',
                page_slug: 'about'
            }
        ];
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        //this.sub.unsubscribe();
    }
}
