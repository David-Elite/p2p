import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class User
{
    id: string;
    userName: string;
    email: string;
    mobile: string;
    gender: string;
    country: string;
    password: string;
    role: string;
    active: boolean;

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user?)
    {
        user = user || {};
        this.id = user.id || '';
        this.userName = user.userName || '';
        this.email = user.email || '';
        this.mobile = user.mobile || '';
        this.gender = user.gender || '';
        this.country = user.country || '';
        this.password = user.password || '';
        this.role = user.role || '';
        this.active = user.active || true;
    }

}
