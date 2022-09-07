// assets
import { IconCurrencyEuro, IconHelp } from '@tabler/icons';

// constant
const icons = { IconCurrencyEuro, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
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
