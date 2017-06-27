import { Component } from '@angular/core';

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

    constructor(private imageService: ImageAdminService) { }

    ngOnInit() {
        this.image = {
            image_original_name: '',
            image_cache: 7257600,
            image_alt: 'Alt text here'
        };
        this.imageMessage = {};
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
            },
            (err) => {
                this.imageMessage = err[0];
            }
        );
    }
}
