import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'categoriess',
                title    : 'Categories',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'category',
                url      : '/categories',
            },
            {
                id       : 'zone',
                title    : 'Zones',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'place',
                url      : '/zone',
            },
            {
                id       : 'landing-page',
                title    : 'Landing page',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'pageview',
                url      : '/landing-page',
            },
            {
                id       : 'tour-package',
                title    : 'Tour Package',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'tour',
                url      : '/tour-package',
            },
            {
                id       : 'review',
                title    : 'Review',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'rate_review',
                url      : '/review',
            },
            {
                id       : 'jobs',
                title    : 'Jobs',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'details',
                url      : '/jobs',
            },
            {
                id       : 'admin-user',
                title    : 'Admin User',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'person',
                url      : '/admin-user',
            },
        ]
    }
];
