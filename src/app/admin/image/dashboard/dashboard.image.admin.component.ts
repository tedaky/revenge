import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router'

import { ImageAdmin, ImageAdminMessage } from '../image.admin';
import { ImageAdminService } from '../image.admin.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-image-admin-component',
    templateUrl: 'dashboard.image.admin.template.html',
    styleUrls: ['dashboard.image.admin.component.scss'],
    providers: [ ImageAdminService ]
})

export class DashboardImageAdminComponent {
    images?: ImageAdmin[];
    imageMessage?: ImageAdminMessage;
    sub: any;

    constructor(private imageService: ImageAdminService, private route: ActivatedRoute) { }

    ngOnInit() {
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            // Retrieve Pet with Id route param
            this.imageService.getImageList().subscribe(
                (image) => {
                    if(image[0].error) {
                        this.imageMessage = image[0];
                    } else {
                        this.images = image;
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
}
