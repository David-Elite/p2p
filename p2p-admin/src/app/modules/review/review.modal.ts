import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Review
{
    id: string;
    reviewerId: string;
    reviewDate: string;
    reviewerName: string;
    reviewerTitle: string;
    reviewTitle: string;
    reviewContent: string;
    reviewPoints: number;
    referenceId: string;
    reviewerImage: string[];
    images: {
        id: string,
        url: string
    }[];
    active: boolean;

    /**
     * Constructor
     *
     * @param review
     */
    constructor(review?)
    {
        review = review || {};
        this.id = review.id || '';
        this.referenceId = review.referenceId || '';
        this.reviewDate = review.reviewDate || '';
        this.reviewerName = review.reviewerName || '';
        this.reviewerTitle = review.reviewerTitle || '';
        this.reviewerImage = review.reviewerImage || '';
        this.reviewTitle = review.reviewTitle || '';
        this.reviewContent = review.reviewContent || '';
        this.reviewPoints = review.reviewPoints || 0;
        this.images = review.images || [];
        this.active = review.active || true;
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
