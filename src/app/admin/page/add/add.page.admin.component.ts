import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router'

import { PageAdmin, PageAdminList, PageAdminMessage } from '../page.admin';
import { PageAdminService } from '../page.admin.service';

@Component({
    moduleId: module.id,
    selector: 'add-page-admin-component',
    templateUrl: 'add.page.admin.template.html',
    providers: [ PageAdminService ]
})

export class AddPageAdminComponent {
    pages: PageAdmin[];
    pageMessage?: PageAdminMessage;
    sub: any;

    constructor(private pageService: PageAdminService, private route: ActivatedRoute) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        //this.sub.unsubscribe();
    }
}
