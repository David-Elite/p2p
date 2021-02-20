import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Category
{
    id: string;
    name: string;
    handle: string;
    description: string;
    tags: string[];
    images: {
        id: string,
        url: string
    }[];
    active: boolean;

    /**
     * Constructor
     *
     * @param category
     */
    constructor(category?)
    {
        category = category || {};
        this.id = category.id || FuseUtils.generateGUID();
        this.name = category.name || '';
        this.handle = category.handle || FuseUtils.handleize(this.name);
        this.description = category.description || '';
        this.tags = category.tags || [];
        this.images = category.images || [];
        this.active = category.active || true;
    }

    /**
     * Add tag
     *
     * @param {MatChipInputEvent} event
     */
    addTag(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.tags.push(value);
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
    removeTag(tag): void
    {
        const index = this.tags.indexOf(tag);

        if ( index >= 0 )
        {
            this.tags.splice(index, 1);
        }
    }
}
