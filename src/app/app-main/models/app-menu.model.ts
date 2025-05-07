export class MenuItem {
    label: string;
    icon: string;
    command!: (event?: any) => void;
    url: string;
    routerLink: any;
    queryParams!: {
        [k: string]: any;
    };
    items: MenuItem[]; //|  MenuItem[][];
    expanded: boolean;
    disabled: boolean;
    visible: boolean;
    target: string;
    routerLinkActiveOptions: any;
    separator: boolean;
    badge: string;
    badgeStyleClass: string;
    style: any;
    styleClass: string;
    title: string;
    id: string;
    automationId: any;

    //constructor()
    constructor(_label: string, _icon: string, _routerLink: any, _items: MenuItem[], _command: any ) {
        this.label = _label;
        this.icon = _icon;
        this.routerLink = _routerLink;
        this.command = _command;
        this.url = '';
        this.items = _items;
        this.expanded = false;
        this.disabled = false;
        this.visible = false;
        this.target = '';
        this.separator = false;
        this.badge = '';
        this.badgeStyleClass = '';
        this.styleClass = '';
        this.title = '';
        this.id = '';
    }
}
