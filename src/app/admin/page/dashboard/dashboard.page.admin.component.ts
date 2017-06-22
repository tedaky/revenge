import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router'

import { PageAdmin, PageAdminList, PageAdminMessage } from '../page.admin';
import { PageAdminService } from '../page.admin.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-page-admin-component',
    templateUrl: 'dashboard.page.admin.template.html',
    providers: [ PageAdminService ]
})

export class DashboardPageAdminComponent {
    pages: PageAdmin[];
    pageMessage?: PageAdminMessage;
    sub: any;

    constructor(private pageService: PageAdminService, private route: ActivatedRoute) { }

    ngOnInit() {
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            // Retrieve Pet with Id route param
            this.pageService.getPageList().subscribe(
                (page) => {
                    this.pages = page;
                },
                (err) => {
                    this.pageMessage = err[0];
                }
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
}
