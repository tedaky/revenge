import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ImageAdmin, ImageAdminMessage } from '../image.admin';
import { ImageAdminService } from '../image.admin.service';

@Component({
    moduleId: module.id,
    selector: 'add-image-admin-component',
    templateUrl: 'add.image.admin.template.html',
    styleUrls: ['add.image.admin.component.scss'],
    providers: [ ImageAdminService ]
})

export class AddImageAdminComponent {
    image: ImageAdmin;
    imageMessage?: ImageAdminMessage;

    days: number;
    hours: number;
    minutes: number;
    seconds: number;

    constructor(private imageService: ImageAdminService, private router: Router) { }

    ngOnInit() {
        this.image = {
            image_original_name: null,
            image_cache: null,
            image_alt: null
        };
        this.imageMessage = {};

        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;

        this.updateCache();
    }

    updateCache() {
        this.image.image_cache = (this.days * 24 * 60 * 60) + (this.hours * 60 * 60) + (this.minutes * 60) + (this.seconds);
    }

    addFile(event: Event) {
        var reader = new FileReader();

        reader.onload = function(e: ProgressEvent) {
            (<HTMLImageElement>(<HTMLInputElement>event.target).nextElementSibling).src = (<FileReader>e.target).result;
        }

        if((<HTMLInputElement>event.target).value.length && (<HTMLInputElement>event.target).files[0].type.match('image')){
            reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
            this.image.image_original_name = (<HTMLInputElement>event.target).files[0];
        } else {
            (<HTMLImageElement>(<HTMLInputElement>event.target).nextElementSibling).src = '';
            (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).defaultValue;
            this.image.image_original_name = '';
        }
    }

    addImage(image: ImageAdmin) {
        this.imageService.addImage(image).subscribe(
            (img) => {
                this.imageMessage = img[0];
                this.router.navigate(['admin', 'image']);
            },
            (err) => {
                this.imageMessage = err[0];
            }
        );
    }
}
