import { Component } from '@angular/core';
import { NavSiteService } from './nav.site.service';

@Component({
    moduleId: module.id,
    selector: 'nav-site-component',
    templateUrl: 'nav.site.template.html',
    providers: [ NavSiteService ]
})

export class NavSiteComponent {
    links: link[];

    constructor (private navSiteService: NavSiteService) {
        this.navSiteService.getSiteLinks().subscribe(links => {
            this.links = links;
        });
    }
}

interface link {
    name: string;
    path: string;
}