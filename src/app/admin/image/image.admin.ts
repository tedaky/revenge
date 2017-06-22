export class ImageAdmin {
    image_id?: number;
    image_original_name?: any;
    image_unique_name?: string;
    image_cache?: number;
    image_width?: number;
    image_height?: number;
    image_created?: Date;
    image_modified?: Date;
    image_alt?: string;
}

export class FullImageAdmin {
    image_id?: number;
    image_original_name?: any;
    image_unique_name?: string;
    image_mime_type?: string;
    image_cache?: number;
    image_width?: number;
    image_height?: number;
    image_created?: Date;
    image_modified?: Date;
    image_alt?: string;
}

export class ImageAdminMessage {
    success?: string;
    error?: string;
}