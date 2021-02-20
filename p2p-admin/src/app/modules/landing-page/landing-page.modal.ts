import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class LandingPage
{
    id: string;
    title: string;
    handle: string;
    subtitle: string;
    description: string;
    metaTitle: string;
    metaDesc: string;
    metaKeywords: string[];
    images: {
        id: string,
        url: string
    }[];
    section: {
        id: string,
        title: string,
        subtitle: string,
        contentType: string,
        displayType: string,
        position: number
    }[];
    misc: {
        id: string;
        title: string;
        content: string;
    }[];
    faq: {
        id: string;
        ques: string;
        ans: string;
    }[];
    link: {
        id: string;
        title: string;
        url: string;
        icon: string;
    }[];
    active: boolean;
    coverImage: string;

    /**
     * Constructor
     *
     * @param landingPage
     */
    constructor(landingPage?)
    {
        landingPage = landingPage || {};
        this.id = landingPage.id || FuseUtils.generateGUID();
        this.title = landingPage.title || '';
        this.handle = landingPage.handle || FuseUtils.handleize(this.title);
        this.subtitle = landingPage.subtitle || '';
        this.description = landingPage.description || '';
        this.metaTitle = landingPage.metaTitle || '';
        this.metaDesc = landingPage.metaDesc || '';
        this.metaKeywords = landingPage.metaKeywords || [];
        this.images = landingPage.images || [];
        this.section = landingPage.section || [];
        this.misc = landingPage.misc || [];
        this.faq = landingPage.faq || [];
        this.link = landingPage.link || [];
        this.active = landingPage.active || true;
        this.coverImage = landingPage.coverImage || null;
    }

    /**
     * Add Meta Keywords
     *
     * @param {MatChipInputEvent} event
     */
    addKeywords(event: MatChipInputEvent, control: FormControl): void
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
    removeKeywords(tag, control: FormControl): void
    {
        const index = this.metaKeywords.indexOf(tag);

        if ( index >= 0 )
        {
            this.metaKeywords.splice(index, 1);
            control.markAsDirty();
        }
    }
}
