export class ActionPanelItem {
    ActionPanelItemKey: string;
    ActionPanelItemLinkedWith: Array<string>;
    FunctionCode: string;
    Description: string;
    Icon: string;
    Disabled: boolean;
    IsMultiSelectionAllowed: boolean;
    command?: (event?: any) => void;
    private isDependOnSelection: boolean = false;

    constructor() {
        this.ActionPanelItemKey = '';
        this.ActionPanelItemLinkedWith = new Array<string>();
        this.FunctionCode = '';
        this.Description = '';
        this.Icon = '';
        this.Disabled = false;
        this.IsDependOnSelection = true;
        this.IsMultiSelectionAllowed = false;
    }

    get IsDependOnSelection(): boolean {
        return this.isDependOnSelection;
    }
    set IsDependOnSelection(value: boolean) {
        this.isDependOnSelection = value;
        // if (this.isDependOnSelection) {
        //     this.Disabled = true;
        // } else {
        //     this.Disabled = false;
        // }
        this.Disabled  = value;
    }

    onSingleSelect(): void {
        this.Disabled = false;
    }

    onMultiselect(): void {
        // if (this.IsMultiSelectionAllowed) {
        //     this.Disabled = false;
        // } else {
        //     this.Disabled = true;
        // }
        this.Disabled = !this.IsMultiSelectionAllowed;
    }
}
