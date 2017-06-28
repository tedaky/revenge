import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta, BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router'

import { SiteService } from './site.service';
import { Site, SiteMeta } from './site';

@Component({
    moduleId: module.id,
    selector: 'site-component',
    templateUrl: 'site.template.html',
    styleUrls: ['./site.component.scss'],
    providers: [ SiteService ]
})

export class SiteComponent implements OnInit, OnDestroy {
    site: Site;
    siteMeta: SiteMeta[];
    body: any;
    sub: any;
    slug: string;

    constructor(private titleService: Title, private metaService: Meta, private siteService: SiteService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            this.slug = params['slug'];

            // Retrieve Pet with Id route param
            this.siteService.getSite(this.slug).subscribe(
                (site) => {
                    this.site = site.page[0];

                    this.body = this.sanitizer.bypassSecurityTrustHtml(this.site.page_body);
                    this.site.page_body = this.body;
                    this.titleService.setTitle(this.site.page_title);


                    this.siteMeta = site.meta;
                    if(this.siteMeta) {
                        for (let meta of this.siteMeta) {
                            this.metaService.updateTag({ name: meta.meta_name, content: meta.meta_content });
                        }
                    }
                },
                (err) => {
                    this.site = err.json()[0];
                    this.site.page_body = this.site.page_body + ': ' + err.status;
                }
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
}

/* Note: Title service should be in the root component (app.component) and listen for title changes */
