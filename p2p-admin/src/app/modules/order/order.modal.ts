import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Order
{
    id: string;
    ordererId: string;
    orderDate: string;
    customerName: string;
    customerId: string;
    adults: number;
    childrens: number;
    referenceId: string;
    active: boolean;

    /**
     * Constructor
     *
     * @param order
     */
    constructor(order?)
    {
        order = order || {};
        this.id = order.id || '';
        this.referenceId = order.referenceId || '';
        this.orderDate = order.orderDate || '';
        this.customerName = order.customerName || '';
        this.customerId = order.customerId || '';
        this.adults = order.adults || '';
        this.childrens = order.childrens || '';
        this.active = order.active || true;
    }

    /**
     * Add tag
     *
     * @param {MatChipInputEvent} event
     */
    // addTag(event: MatChipInputEvent): void
    // {
    //     const input = event.input;
    //     const value = event.value;

    //     // Add tag
    //     if ( value )
    //     {
    //         this.tags.push(value);
    //     }

    //     // Reset the input value
    //     if ( input )
    //     {
    //         input.value = '';
    //     }
    // }

    /**
     * Remove tag
     *
     * @param tag
     */
    // removeTag(tag): void
    // {
    //     const index = this.tags.indexOf(tag);

    //     if ( index >= 0 )
    //     {
    //         this.tags.splice(index, 1);
    //     }
    // }
}
