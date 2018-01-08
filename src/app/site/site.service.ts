import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { ActivatedRoute, Params } from '@angular/router';
// import 'rxjs/add/operator/map';

@Injectable()
export class SiteService {
    url: string;
    call: string;
    slug: string;

    constructor (private http: Http) { }

    getSite(slug?: string) {
        this.call = '/api/site/page/';

        if (!slug) {
            if (!/localhost/.test(document.location.host)) {
                this.url = this.call;
            } else {
                this.url = this.call;
            }
        } else {
            this.slug = slug;

            if (!/localhost/.test(document.location.host)) {
                this.url = this.call + this.slug;
            } else {
                this.url = this.call + this.slug;
            }
        }

        return this.http.get( this.url ).map(
            (res) => {
                if ( res.status !== 200 ) {
                    throw new Error('page not found: ' + res.status);
                } else {
                    return res.json();
                }
            }
        );
    }
}
