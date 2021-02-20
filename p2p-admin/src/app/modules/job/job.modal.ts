import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Job
{
    id: string;
    title: string;
    desc: string;
    overview: string;
    rnr: string;
    images: {
        id: string,
        url: string
    }[];
    active: boolean;

    /**
     * Constructor
     *
     * @param job
     */
    constructor(job?)
    {
        job = job || {};
        this.id = job.id || FuseUtils.generateGUID();
        this.title = job.title || '';
        this.desc = job.desc || '';
        this.overview = job.overview || '';
        this.rnr = job.rnr || '';
        this.images = job.images || [];
        this.active = job.active || true;
    }

    }
