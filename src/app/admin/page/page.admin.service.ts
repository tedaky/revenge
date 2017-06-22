import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';

import { PageAdmin, PageAdminList, PageAdminMessage } from './page.admin';

@Injectable()
export class PageAdminService {
    url: string;
    call: string;

    constructor (private http: Http) { }

    getPageList() {
        this.call = '/api/page/getPageList';

        if (!/localhost/.test(document.location.host)) {
            this.url = this.call;
        } else {
            this.url = 'http://www.quickstart.dev' + this.call;
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

