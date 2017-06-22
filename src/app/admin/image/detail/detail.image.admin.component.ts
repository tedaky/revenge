import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router'

import { ImageAdminMessage, FullImageAdmin } from '../image.admin';
import { ImageAdminService } from '../image.admin.service';

@Component({
    moduleId: module.id,
    selector: 'detail-image-admin-component',
    templateUrl: 'detail.image.admin.template.html',
    providers: [ ImageAdminService ]
})

export class DetailImageAdminComponent {
    image: FullImageAdmin;
    imageMessage?: ImageAdminMessage;
    sub: any;
    id: number;

    constructor(private imageService: ImageAdminService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            
            // Retrieve Pet with Id route param
            this.imageService.getImage(this.id).subscribe(
                (img) => {
                    this.image = img;
                },
                (err) => {
                    console.log(err);
                    this.router.navigate(['admin', 'image']);
                }
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    deleteImage() {
        this.sub = this.route.params.subscribe(params =>{
            this.id = params['id'];

            this.imageService.deleteImage(this.id).subscribe(
                (img) => {
                    this.router.navigate(['admin', 'image']);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }
}
