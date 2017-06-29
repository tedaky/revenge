import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Page, PageMeta, PageTotal, PageAdminMessage, CacheSecondsToDHMS } from '../page.admin';
import { PageAdminService } from '../page.admin.service';

@Component({
    moduleId: module.id,
    selector: 'detail-page-admin-component',
    templateUrl: 'detail.page.admin.template.html',
    styleUrls: ['detail.page.admin.component.scss'],
    providers: [ PageAdminService ]
})

export class DetailPageAdminComponent {
    page: Page;
    pageMeta: PageMeta;
    pageMessage?: PageAdminMessage;
    sub: any;
    id: number;
    body: any;

    cacheSecondsToDHMS: CacheSecondsToDHMS;

    constructor(private pageService: PageAdminService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];

            // Retrieve page with Id route param
            this.pageService.getPage(this.id).subscribe(
                (page) => {
                    this.page = page.page[0];

                    this.body = this.sanitizer.bypassSecurityTrustHtml(this.page.page_body);
                    this.page.page_body = this.body;

                    this.cacheSecondsToDHMS = this.secondsToString(this.page.page_cache);

                    this.pageMeta = page.meta;
                },
                (err) => {
                    console.log(err);
                    this.router.navigate(['admin', 'page']);
                }
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    deletePage() {
        this.sub = this.route.params.subscribe(params =>{
            this.id = params['id'];

            this.pageService.deletePage(this.id).subscribe(
                (img) => {
                    this.router.navigate(['admin', 'page']);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }


    secondsToString(sec) {
        var days = Math.floor(sec / 86400);
        var hours = Math.floor((sec % 86400) / 3600);
        var minutes = Math.floor(((sec % 86400) % 3600) / 60);
        var seconds = ((sec % 86400) % 3600) % 60;
        return {
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }
}
