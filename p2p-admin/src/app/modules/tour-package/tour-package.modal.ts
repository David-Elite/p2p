import { AbstractControl, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class TourPackage
{
    id: string;
    title: string;
    handle: string;
    days: number;
    nights: number;
    shortDescription: string;
    description: string;
    category: string;
    continent: string;
    country: string;
    state: string;
    city: string;
    region: string;
    videoUrl: string;
    price: number;
    taxPercent: number;
    priceWithTax: number;
    comparedPrice: number;
    priceUnit: string;
    tags: string[];
    highlights: string[];
    ribbonTag: string[];
    bookingForm: boolean;
    inquiryForm: boolean;
    aminities: string[];
    tripType: string;
    metaTitle: string;
    metaDesc: string;
    metaKeywords: string[];
    images: {
        id: string,
        url: string
    }[];
    itinerary: {
        id: string;
        title: string;
        details: string;
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
     * @param tourPackage
     */
    constructor(tourPackage?)
    {
        tourPackage = tourPackage || {};
        this.id = tourPackage.id || FuseUtils.generateGUID();
        this.title = tourPackage.title || '';
        this.handle = tourPackage.handle || FuseUtils.handleize(this.title);
        this.days = tourPackage.days || null;
        this.nights = tourPackage.nights || null;
        this.shortDescription = tourPackage.shortDescription || '';
        this.description = tourPackage.description || '';
        this.category = tourPackage.category || '';
        this.continent = tourPackage.continent || '';
        this.country = tourPackage.country || '';
        this.state = tourPackage.state || '';
        this.city = tourPackage.city || '';
        this.region = tourPackage.region || '';
        this.videoUrl = tourPackage.videoUrl || '';
        this.price = tourPackage.price || null;
        this.priceWithTax = tourPackage.priceWithTax || null;
        this.taxPercent = tourPackage.taxPercent || null;
        this.comparedPrice = tourPackage.comparedPrice || null;
        this.priceUnit = tourPackage.priceUnit || '';
        this.tags = tourPackage.tags || [];
        this.highlights = tourPackage.highlights || [];
        this.ribbonTag = tourPackage.ribbonTag || '';
        this.bookingForm = tourPackage.bookingForm || false;
        this.inquiryForm = tourPackage.inquiryForm || true;
        this.aminities = tourPackage.aminities || [];
        this.metaTitle = tourPackage.metaTitle || '';
        this.tripType = tourPackage.tripType || '';
        this.metaDesc = tourPackage.metaDesc || '';
        this.metaKeywords = tourPackage.metaKeywords || [];
        this.images = tourPackage.images || [];
        this.itinerary = tourPackage.itinerary || [];
        this.misc = tourPackage.misc || [];
        this.faq = tourPackage.faq || [];
        this.link = tourPackage.link || [];
        this.active = tourPackage.active || true;
        this.coverImage = tourPackage.coverImage || null;
    }

    /**
     * Add tag
     *
     * @param {MatChipInputEvent} event
     */
    addTag(event: MatChipInputEvent, control: FormControl | AbstractControl): void
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
    removeTag(tag, control: FormControl | AbstractControl): void
    {
        const index = this.tags.indexOf(tag);

        if ( index >= 0 )
        {
            this.tags.splice(index, 1);
            control.markAsDirty();
        }
    }

    /**
     * Add Highlights
     *
     * @param {MatChipInputEvent} event
     */
    addHighlights(event: MatChipInputEvent, control: FormControl | AbstractControl): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.highlights.push(value);
            control.markAsDirty();
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    /**
     * Remove Highlights
     *
     * @param highlight
     */
    removeHighlights(highlight, control: FormControl | AbstractControl): void
    {
        const index = this.highlights.indexOf(highlight);

        if ( index >= 0 )
        {
            this.highlights.splice(index, 1);
            control.markAsDirty();
        }
    }

    /**
     * Add Meta Keywords
     *
     * @param {MatChipInputEvent} event
     */
    addKeywords(event: MatChipInputEvent, control: FormControl | AbstractControl): void
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
    removeKeywords(tag, control: FormControl | AbstractControl): void
    {
        const index = this.metaKeywords.indexOf(tag);

        if ( index >= 0 )
        {
            this.metaKeywords.splice(index, 1);
            control.markAsDirty();
        }
    }
}
