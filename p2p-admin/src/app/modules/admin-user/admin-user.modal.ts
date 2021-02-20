import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Adminuser
{
    id: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    active: boolean;

    /**
     * Constructor
     *
     * @param adminuser
     */
    constructor(adminuser?)
    {
        adminuser = adminuser || {};
        this.id = adminuser.id || '';
        this.userName = adminuser.userName || '';
        this.email = adminuser.email || '';
        this.password = adminuser.password || '';
        this.role = adminuser.role || '';
        this.active = adminuser.active || true;
    }

}
