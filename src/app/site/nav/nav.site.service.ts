import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NavSiteService {
    url: string;
    call: string;

    constructor(private http: Http) { }

    getSiteLinks() {
        this.call = '/api/navigation/getSiteLinks/';

        if (!/localhost/.test(document.location.host)) {
            this.url = this.call;
        } else {
            this.url = 'http://www.quickstart.dev' + this.call;
        }
        
        return this.http.get(this.url).map( res => res.json() );
    }
}