export class Page {
    page_id?: number;
    page_title?: string;
    page_slug?: string;
    page_body?: string;
    page_cache?: number;
}

export class PageMeta {
    meta_id?: number;
    meta_name?: string;
    meta_content?: string;
}

export class PageTotal {
    page?: Page;
    meta?: PageMeta[];
}

export class PageAdminMessage {
    success?: string;
    error?: string;
}
