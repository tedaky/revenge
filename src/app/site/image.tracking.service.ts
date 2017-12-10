import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ImageTracking } from './image.tracking';

@Injectable()
export class ImageTrackingService {

    constructor(private http: Http) { }

    public getImageId(src?: string) {
        if (src) {
            let call = '/api/image/getImageId';
            let url: string;
            if (!/localhost/.test(document.location.host)) {
                url = call + '/' + src;
            } else {
                url = 'http://www.quickstart.dev' + call + '/' + src;
            }

            return this.http.get(url).map(
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

