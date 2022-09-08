// assets
import { IconCurrencyEuro, IconHelp, IconCalendar } from '@tabler/icons';

// constant
const icons = { IconCurrencyEuro, IconHelp, IconCalendar };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    title: 'Features',
    children: [
        {
            id: 'calender',
            title: 'Calender',
            type: 'item',
            url: '/calender',
            icon: icons.IconCalendar,
            breadcrumbs: false
        },
        {
            id: 'finance',
            title: 'Finance',
            type: 'item',
            url: '/finance',
            icon: icons.IconCurrencyEuro,
            breadcrumbs: false
        }

        // {
        //     id: 'documentation',
        //     title: 'Documentation',
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/',
        //     icon: icons.IconHelp,
        //     external: true,
        //     target: true
        // }
    ]
};

export default other;
