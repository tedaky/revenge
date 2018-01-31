import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef } from '@angular/core';
import { Title, Meta, BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { SiteService } from './site.service';
import { Site, SiteMeta } from './site';

import { ImageTracking } from './image.tracking';
import { ImageTrackingService } from './image.tracking.service';

@Component({
    moduleId: module.id,
    selector: 'site-component',
    templateUrl: 'site.template.html',
    styleUrls: ['./site.component.scss'],
    providers: [ SiteService, ImageTrackingService ]
})

export class SiteComponent implements OnInit, OnDestroy, AfterViewChecked {
    site: Site;
    siteMeta: SiteMeta[];
    sub: any;
    imageId: ImageTracking;

    constructor(
        public titleService: Title,
        public metaService: Meta,
        public siteService: SiteService,
        public route: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public elementRef: ElementRef,
        public imageTrackingService: ImageTrackingService
    ) { }

    ngOnInit() {
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            const slug: string = params['slug'];
            const loadStart: number = new Date().getTime();

            // Retrieve Pet with Id route param
            this.siteService.getSite(slug).subscribe(
                (site) => {
                    this.site = site.page[0];

                    const body: any = this.sanitizer.bypassSecurityTrustHtml(this.site.page_body);
                    this.site.page_body = body;
                    this.titleService.setTitle(this.site.page_title);


                    this.siteMeta = site.meta;
                    if (this.siteMeta) {
                        for (const meta of this.siteMeta) {
                            this.metaService.updateTag({ name: meta.meta_name, content: meta.meta_content });
                        }
                    }

                    const loadEnd: number = new Date().getTime();
                    console.log('Component Page Id: ' + this.site.page_id + ' Load Time: ' + (loadEnd - loadStart));
                },
                (err) => {
                    this.site = err.json()[0];
                    this.site.page_body = this.site.page_body + ': ' + err.status;

                    const loadEnd: number = new Date().getTime();
                    console.log('Component Load Time: ' + (loadEnd - loadStart));
                }
            );
        });
    }

    imageComplete(image: HTMLImageElement) {
        const completed: boolean = image.complete;
        if (!completed) {
            setTimeout(this.imageComplete, 1, image);
        } else {
            const loadEnd: any = new Date().getTime();
            if (!image.getAttribute('data-load-end')) {
                image.setAttribute('data-load-end', loadEnd);
                console.log('Image Load Time: ' + (loadEnd - parseInt(image.getAttribute('data-load-start'), 10)));
                const src = image.getAttribute('src');
                const imageName = src.substr(src.lastIndexOf('/') + 1);
                this.imageTrackingService.getImageId(imageName).subscribe(
                    (imageId) => {
                        this.imageId = imageId;
                        console.log(this.imageId);
                    }
                );
            }
        }
    }

    ngAfterViewChecked() {
        const image = this.elementRef.nativeElement.querySelectorAll('img');
        if (image.length) {
            for (let i = 0; i < image.length; i++) {
                if (!image[i].getAttribute('data-load-start')) {
                    const loadStart: any = new Date().getTime();
                    image[i].setAttribute('data-load-start', loadStart);
                }
                this.imageComplete(image[i]);
            }
        }
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
}

/* Note: Title service should be in the root component (app.component) and listen for title changes */
