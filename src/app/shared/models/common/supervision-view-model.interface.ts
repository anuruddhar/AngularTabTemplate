import { TableColumn } from '../table-column.interface';
import { ActionPanelItem } from './action-panel-item.model';
import { WidgetItem } from './widget-item.model';
import { PrimeDropDownItem } from '../p-drop-down-item.model';

export interface ISupervisionViewModel<T, S > {
    CurrentSeachCriteria: S;
    IsShowSidePanel: boolean;
    IsShowHistory: boolean;
    SelectionKey: string;
    SelectedItems: Array<any>;
    IsMultipleSelectionRequired: boolean;
    Columns: Array<TableColumn>;
    GridData: Array<T>;
    LocalStorageKey: string;
    ActionPanelItems: Array<ActionPanelItem>;
    Widgets: Array<WidgetItem>;
    ListItems: Array<PrimeDropDownItem>;
    onSearch(): Promise<void>;
    onPageSearch(pageNo: number): void;
    onActionPanelItemClicked(key: string): void;
    DblClicked(item): void;
}
