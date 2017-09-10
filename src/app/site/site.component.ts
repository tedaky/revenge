import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef } from '@angular/core';
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

export class SiteComponent implements OnInit, OnDestroy, AfterViewChecked {
    site: Site;
    siteMeta: SiteMeta[];
    sub: any;

    constructor(private titleService: Title, private metaService: Meta, private siteService: SiteService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private elementRef: ElementRef) { }

    ngOnInit() {
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            let slug: string = params['slug'];
            let loadStart: number = new Date().getTime();

            // Retrieve Pet with Id route param
            this.siteService.getSite(slug).subscribe(
                (site) => {
                    this.site = site.page[0];

                    let body: any = this.sanitizer.bypassSecurityTrustHtml(this.site.page_body);
                    this.site.page_body = body;
                    this.titleService.setTitle(this.site.page_title);


                    this.siteMeta = site.meta;
                    if(this.siteMeta) {
                        for (let meta of this.siteMeta) {
                            this.metaService.updateTag({ name: meta.meta_name, content: meta.meta_content });
                        }
                    }

                    let loadEnd: number = new Date().getTime();
                    console.log('Component Load Time: ' + (loadEnd - loadStart));
                },
                (err) => {
                    this.site = err.json()[0];
                    this.site.page_body = this.site.page_body + ': ' + err.status;

                    let loadEnd: number = new Date().getTime();
                    console.log('Component Load Time: ' + (loadEnd - loadStart));
                }
            );
        });
    }

    ngAfterViewChecked() {
        let image = this.elementRef.nativeElement.querySelectorAll('img');
        if (image.length) {
            for (let i = 0; i < image.length; i++) {
                if(!image[i].getAttribute('data-load-start')) {
                    let loadStart: any = new Date().getTime();
                    image[i].setAttribute('data-load-start', loadStart);
                }
                this.imageComplete(image[i]);
            }
        }
    }

    imageComplete(image: HTMLImageElement) {
        let completed: boolean = image.complete;
        if(!completed) {
            setTimeout(this.imageComplete, 1, image);
        } else {
            let loadEnd: any = new Date().getTime();
            if(!image.getAttribute('data-load-end')) {
                image.setAttribute('data-load-end', loadEnd);
                console.log('Image Load Time: ' + (loadEnd - parseInt(image.getAttribute('data-load-start'))));
            }
        }
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
}

/* Note: Title service should be in the root component (app.component) and listen for title changes */
