import { ActionPanelItem } from './action-panel-item.model';
import { ActionPanelItemService } from 'src/app/shared/services/action-panel-item.service';
import { WidgetItem } from './widget-item.model';
import { TabFormViewModel } from '../tab-form-view.model';
import { TableColumn } from '../table-column.interface';
import { PrimeDropDownItem } from '../p-drop-down-item.model';
import { ISupervisionViewModel } from './supervision-view-model.interface';
import { AppException } from './app-exception';
import { MessageService } from 'primeng/api';
import { SearchBase } from '../search-base.model';
import { LangData } from '../../lang-data';
import { MessageType } from '../../utility/enum';
import { Subject } from 'rxjs';
import { Global, GlobalVariable } from '../../globals';

export class SupervisionBaseViewModel<T, S extends SearchBase> extends TabFormViewModel implements ISupervisionViewModel<T, S>  {
    CurrentSeachCriteria: S;
    IsShowSidePanel: boolean;
    IsShowHistory: boolean;
    IsDataLoading = false;
    // key: string;
    SelectionKey: string;
    SelectedItems: Array<any> = [];
    IsMultipleSelectionRequired: boolean;
    Columns: Array<TableColumn>;
    GridData: Array<T>;
    LocalStorageKey: string;
    ActionPanelItems: Array<ActionPanelItem>;
    Widgets: Array<WidgetItem>;
    ListItems: Array<PrimeDropDownItem> = [];
    i18n: any;
    TriggerSearch: Subject<boolean> = new Subject();
    Title: string;
    global: Global;

    constructor(
        public actionPanelItemService: ActionPanelItemService,
        public messageService: MessageService,
        public actionOrWidgetLinkedWith: string,
        public selectionKey: string,
        public localStorageKey: string,
        public listItems: Array<PrimeDropDownItem>,
        private child: S,
        public title: string) {
        super();
        this.IsShowHistory = true;
        this.IsShowSidePanel = true;
        this.IsMultipleSelectionRequired = false;
        this.i18n = LangData[0];
        this.global = GlobalVariable;
        this.CurrentSeachCriteria = this.child as S;
        this.CurrentSeachCriteria.SearchBy = '1';
        this.SelectionKey = this.selectionKey;
        this.LocalStorageKey = this.localStorageKey;
        this.ListItems = listItems;
        this.setActionOrWidgetLinkedWith(actionOrWidgetLinkedWith);
        this.Title = this.i18n[title];
        this.createCols();
    }

    private setActionOrWidgetLinkedWith(actionOrWidgetLinkedWith: string): void {
        this.ActionPanelItems = new Array<ActionPanelItem>();
        this.actionPanelItemService.getActionalPanelList(actionOrWidgetLinkedWith).subscribe(
            (data) => { this.ActionPanelItems = data; }
        );
    }

    // private populateCols(colArray: Array<TableColumn>): void {
    //     this.Columns = new Array<TableColumn>();
    //     colArray.forEach(item => {
    //         this.Columns.push(item);
    //     });
    // }

    private createCols(): void {
        this.populateCols();
    }
    protected populateCols(): void { }

    onSearch(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    onPageSearch(pageNo: number): void {
        this.CurrentSeachCriteria.PageNo = pageNo;
    }

    onActionPanelItemClicked(key: string): void {
        throw new Error('Method not implemented.');
    }

    DblClicked(item: any): void {
        throw new Error('Method not implemented.');
    }

    reSetSearch(): void {
        this.GridData = [];
        // this.CurrentSeachCriteria.TotalItems = 0;
        this.CurrentSeachCriteria.PageNo = 1;
    }

    showMessage(mesageType: MessageType, title: string, message: string): void {
        switch (mesageType) {
            case MessageType.Success:
                this.messageService.add({ severity: 'success', summary: this.Title, detail: message });
                break;
            case MessageType.Info:
                this.messageService.add({ severity: 'info', summary: this.Title, detail: message });
                break;
            case MessageType.Warning:
                this.messageService.add({ severity: 'warn', summary: this.Title, detail: message });
                break;
            case MessageType.Error:
                this.messageService.add({ severity: 'error', summary: this.Title, detail: message });
                break;
            default:
                break;
        }
    }

    showSuccessMessage(message: string): void {
        this.showMessage(MessageType.Success, this.Title, message);
    }
    showInfoMessage(message: string): void {
        this.showMessage(MessageType.Info, this.Title, message);
    }
    showWarningMessage(message: string): void {
        this.showMessage(MessageType.Warning, this.Title, message);
    }
    showErrorMessage(message: string): void {
        this.showMessage(MessageType.Error, this.Title, message);
    }

    protected logAppError(messageService: MessageService, title: string, error: AppException, isShow: boolean) {
        if (isShow) {
            messageService.add({
                severity: 'error', summary: title,
                detail: error.Message
            });
        } else {
            console.log(`error: ${error.ErrorCode} - ${error.Message}`);
        }
    }

}

