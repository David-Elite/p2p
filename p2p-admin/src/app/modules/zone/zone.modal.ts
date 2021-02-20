import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Zone
{
    id: string;
    zoneType: string;
    title: string;
    handle: string;
    tags: string[];
    continent: string;
    country: string;
    state: string;
    city: string;
    images: {
        id: string,
        url: string
    }[];
    active: boolean;

    /**
     * Constructor
     *
     * @param zone
     */
    constructor(zone?)
    {
        zone = zone || {};
        this.id = zone.id || FuseUtils.generateGUID();
        this.zoneType = zone.zoneType || '';
        this.title = zone.title || '';
        this.handle = zone.handle || FuseUtils.handleize(this.title);
        this.tags = zone.tags || [];
        this.continent = zone.continent || '';
        this.country = zone.country || '';
        this.state = zone.state || '';
        this.city = zone.city || '';
        this.images = zone.images || [];
        this.active = zone.active || true;
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
