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
        header: 'menu.services'
    },
    {
        title: 'menu.databases',
        icon: 'mdi-database',
        to: 'databases'
    },
    {
        title: 'menu.n8n',
        icon: 'mdi-flash-auto',
        to: 'n8n',
        disabled: true,
        chip: 'generic.soon',
        chipBgColor: 'success',
    },
    {
        title: 'menu.messageQueues',
        icon: 'mdi-message-text',
        to: 'message-queue'
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
    { divider: true },
    {
        title: 'menu.settings',
        icon: 'mdi-cog',
        to: 'settings',
    },
];

export default menuItems;
