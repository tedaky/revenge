import { Component } from '@angular/core';

import { Page, PageAdminMessage } from '../page.admin';
import { PageAdminService } from '../page.admin.service';

@Component({
    moduleId: module.id,
    selector: 'add-page-admin-component',
    templateUrl: 'add.page.admin.template.html',
    styleUrls: ['add.page.admin.component.scss'],
    providers: [ PageAdminService ]
})

export class AddPageAdminComponent {
    page: Page;
    pageMessage?: PageAdminMessage;

    constructor(private pageService: PageAdminService) { }

    ngOnInit() {
        this.page = {
            page_id: null,
            page_slug: '',
            page_title: '',
            page_body: ''
        };
        this.pageMessage = {};
    }

    addPage(page: Page) {
        this.pageService.addPage(page).subscribe(
            (page) => {
                this.pageMessage = page[0];
            },
            (err) => {
                this.pageMessage = err[0];
            }
        );
    }
}
