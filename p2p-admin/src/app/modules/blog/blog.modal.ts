import { AbstractControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Blog
{
    id: string;
    title: string;
    handle: string;
    description: string;
    content: string;
    date: string;
    author: string;
    category: string[];
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
     * @param blog
     */
    constructor(blog?)
    {
        blog = blog || {};
        this.id = blog.id || FuseUtils.generateGUID();
        this.title = blog.title || '';
        this.handle = blog.handle || FuseUtils.handleize(this.title);
        this.description = blog.description || '';
        this.content = blog.content || '';
        this.author = blog.author || '';
        this.date = blog.date || '';
        this.category = blog.category || [];
        this.tags = blog.tags || [];
        this.metaDescription = blog.metaDescription || '';
        this.metaTitle = blog.metaTitle || '';
        this.metaKeywords = blog.metaKeywords || [];
        this.images = blog.images || [];
        this.link = blog.link || [];
        this.active = blog.active || true;
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

    /**
     * Add Category
     *
     * @param {MatChipInputEvent} event
     */
    addCategory(event: MatChipInputEvent, control: AbstractControl): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.category.push(value);
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
     * @param cat
     */
    removeCategory(cat, control: AbstractControl): void
    {
        const index = this.category.indexOf(cat);

        if ( index >= 0 )
        {
            this.category.splice(index, 1);
            control.markAsDirty();
        }
    }
}
