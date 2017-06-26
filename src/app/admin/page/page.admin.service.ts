import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';

//import { Page, PageTotal, PageAdminMessage } from './page.admin';

@Injectable()
export class PageAdminService {
    url: string;
    call: string;
    id: number;

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

    getPage(id?: number) {
        if (id) {
            this.call = '/api/page/getPageInfo';
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
}

