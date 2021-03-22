import { AbstractControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Page
{
    id: string;
    title: string;
    handle: string;
    content: string;
    tags: string[];
    images: {
        id: string,
        url: string
    }[];
    link: {
        id: string;
        title: string;
        url: string;
        icon: string;
    }[];
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    active: boolean;

    /**
     * Constructor
     *
     * @param page
     */
    constructor(page?)
    {
        page = page || {};
        this.id = page.id || FuseUtils.generateGUID();
        this.title = page.title || '';
        this.handle = page.handle || FuseUtils.handleize(this.title);
        this.content = page.content || '';
        this.tags = page.tags || [];
        this.metaDescription = page.metaDescription || '';
        this.metaTitle = page.metaTitle || '';
        this.metaKeywords = page.metaKeywords || [];
        this.images = page.images || [];
        this.link = page.link || [];
        this.active = page.active || true;
    }

    /**
     * Add tag
     *
     * @param {MatChipInputEvent} event
     */
    addTag(event: MatChipInputEvent, control: AbstractControl): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.tags.push(value);
            control.markAsDirty();
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    /**
     * Remove tag
     *
     * @param tag
     */
    removeTag(tag, control: AbstractControl): void
    {
        const index = this.tags.indexOf(tag);

        if ( index >= 0 )
        {
            this.tags.splice(index, 1);
            control.markAsDirty();
        }
    }

    /**
     * Add Meta Keywords
     *
     * @param {MatChipInputEvent} event
     */
    addKeywords(event: MatChipInputEvent, control: AbstractControl): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.metaKeywords.push(value);
            control.markAsDirty();
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    /**
     * Remove keywords
     *
     * @param tag
     */
    removeKeywords(tag, control: AbstractControl): void
    {
        const index = this.metaKeywords.indexOf(tag);

        if ( index >= 0 )
        {
            this.metaKeywords.splice(index, 1);
            control.markAsDirty();
        }
    }
}
