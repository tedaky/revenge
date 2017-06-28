/*export class Site {
    title?: string;
    body?: string;
    meta?: SiteMeta[];
}
export class SiteMeta {
    name?: string;
    content?: string;
}*/

export class Site {
    page_id?: number;
    page_title?: string;
    page_slug?: string;
    page_body?: string;
    page_cache?: number;
}

export class SiteMeta {
    meta_id?: number;
    meta_name?: string;
    meta_content?: string;
}
