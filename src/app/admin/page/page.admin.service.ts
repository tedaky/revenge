import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';

import { Page } from './page.admin';

@Injectable()
export class PageAdminService {
    url: string;
    call: string;
    id: number;

    headers = new Headers({ 'Content-Type': 'multipart/form-data' });

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

    addPage(page: Page) {
        this.call = '/api/page/insertPage';

        if (!/localhost/.test(document.location.host)) {
            this.url = this.call;
        } else {
            this.url = 'http://www.quickstart.dev' + this.call;
        }

        let input = new FormData();
        input.append("page_slug", page.page_slug);
        input.append("page_title", page.page_title);
        input.append("page_body", page.page_body);

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

    deletePage(id?: number) {
        if (id) {
            this.call = '/api/page/deletePage';
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

