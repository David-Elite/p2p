import { AbstractControl, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Home
{
    sliderImages: {
        id: string,
        url: string
    }[];
    sliderLinks:{
        id: string;
        title: string;
        subtitle: string;
        url: string;
        icon: string;
    }[];
    section: {
        id: string,
        title: string,
        subtitle: string,
        contentType: string,
        displayType: string,
        position: number,
        active: boolean,
    }[];
    metaTitle: string;
    metaDesc: string;
    metaKeywords: string[];

    /**
     * Constructor
     *
     * @param home
     */
    constructor(home?)
    {
        home = home || {};
        this.metaTitle = home.metaTitle || '';
        this.metaDesc = home.metaDesc || '';
        this.metaKeywords = home.metaKeywords || [];
        this.sliderImages = home.sliderImages || [];
        this.sliderLinks = home.sliderLinks || [];
        this.section = home.section || [];
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
