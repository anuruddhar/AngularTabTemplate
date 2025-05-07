export interface TableColumn {
    field: string;
    header: string;
    width?: string;
    class?: string;
    color?: string;
    tooltip?: string;
    type?: 'text' | 'numeric' | 'boolean' | 'date' | 'button';
    hidden?: boolean;
}
