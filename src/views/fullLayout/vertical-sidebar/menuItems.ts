export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chatCounter?: boolean;
    whatsappMessagesCounter?: boolean;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
    roles?: string[];
    divider?: boolean;
}

const menuItems: menu[] = [
    {
        header: 'menu.dashboard'
    },
    {
        title: 'menu.projects',
        icon: 'mdi-folder',
        to: '/projects'
    },
    // {
    // title: 'home.essentials',
    // icon: ChartDonut3Icon,
    // to: '/',
    // children: [
    // {
    //     title: 'home.assistant',
    //     icon: AssemblyIcon,
    //     chip: 'generic.soon',
    //     chipColor: 'surface',
    //     chipBgColor: 'success',
    //     to: '/dashboards/assistant',
    //     roles: ['dashboard_assistant_read'],
    //     disabled: false
    // },
    //     ]
    // },
];

export default menuItems;
