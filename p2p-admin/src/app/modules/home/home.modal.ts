import { FormControl } from '@angular/forms';
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
}
