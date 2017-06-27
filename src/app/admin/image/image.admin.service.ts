import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';

import { ImageAdmin } from './image.admin';

@Injectable()
export class ImageAdminService {
    url: string;
    call: string;
    id: number;

    headers = new Headers({ 'Content-Type': 'multipart/form-data' });

    constructor(private http: Http) { }

    getImageList() {
        this.call = '/api/image/getImageList';

        if (!/localhost/.test(document.location.host)) {
            this.url = this.call;
        } else {
            this.url = 'http://www.quickstart.dev' + this.call;
        }

        return this.http.get(this.url).map(
            (res) => {
                if (res.status !== 200) {
                    throw new Error('page not found: ' + res.status);
                } else {
                    return res.json();
                }
            }
        );
    }

    getImage(id?: number) {
        if (id) {
            this.call = '/api/image/getImage';
            this.id = id;

            if (!/localhost/.test(document.location.host)) {
                this.url = this.call + '/' + this.id;
            } else {
                this.url = 'http://www.quickstart.dev' + this.call + '/' + this.id;
            }

            return this.http.get(this.url).map(
                (res) => {
                    if (res.status !== 200) {
                        throw new Error('page not found: ' + res.status);
                    } else {
                        return res.json();
                    }
                }
            );
        }
    }

    addImage(image: ImageAdmin) {
        this.call = '/api/image/insertImage';

        if (!/localhost/.test(document.location.host)) {
            this.url = this.call;
        } else {
            this.url = 'http://www.quickstart.dev' + this.call;
        }

        let input = new FormData();
        input.append("image_original_name", image.image_original_name);
        input.append("image_alt", image.image_alt);
        input.append("image_cache", image.image_cache.toString());

        return this.http.post(this.url, input, this.headers).map(
            (res) => {
                if (res.status !== 200) {
                    throw new Error('page not found: ' + res.status);
                } else {
                    return res.json();
                }
            }
        );
    }

    deleteImage(id?: number) {
        if (id) {
            this.call = '/api/image/deleteImage';
            this.id = id;

            if (!/localhost/.test(document.location.host)) {
                this.url = this.call + '/' + this.id;
            } else {
                this.url = 'http://www.quickstart.dev' + this.call + '/' + this.id;
            }

            return this.http.delete(this.url).map(
                (res) => {
                    if (res.status !== 200) {
                        throw new Error('page not found: ' + res.status);
                    } else {
                        return res.json();
                    }
                }
            );
        }
    }
}

