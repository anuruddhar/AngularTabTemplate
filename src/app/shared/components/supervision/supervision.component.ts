import {
  Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, AfterViewInit,
  OnInit, OnDestroy, TemplateRef
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { LazyLoadEvent, MenuItem, SortEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table'; // Import the correct type
// import { ngxLoadingAnimationTypes } from 'ngx-loading';

import { ActionPanelItem } from '../../models/common/action-panel-item.model';
import { TableColumn } from '../../models/table-column.interface';
import { WidgetItem } from '../../models/common/widget-item.model';
import { LocalStorageSearchList } from '../../models/local-storage-search-list.model';
import { SearchBase } from '../../models/search-base.model';
import { ActionMenuItem } from '../../models/action-menu-item.model';
import { CommonFunction } from '../../utility/common-function';
import '../../../shared/utility/extension-method';
import { GlobalVariable } from '../../globals';
import { LangData } from '../../lang-data';
import { Table } from 'primeng/table';



@Component({
  selector: 'app-supervision-component',
  templateUrl: './supervision.component.html',
  styleUrls: ['./supervision.component.css']
})
export class SupervisionComponent implements OnInit, AfterViewInit, OnDestroy {

  global: any;
  i18n: any;
  IsShowShowHidePanelButton: boolean;
  IsHistoryLoading!: boolean;
  IsSelectMultiple: boolean;
  ItemsPerPage: number;
  LocalStorageSearchList!: LocalStorageSearchList;
  ActionMenuItems: Array<ActionMenuItem> = [];
  @ViewChild('dt') dataTable!: Table;
  ContextMenuItems: Array<MenuItem>;
  @ViewChild('mainContainer') MainContainer!: ElementRef;
  @Input() IsDataLoading!: boolean;
  @Input() CurrentSeachCriteria!: SearchBase;
  @Input() TriggerSearch!: Subject<boolean>;
  @Input() IsShowHistory: boolean;
  @Output() IsShowHistoryChange = new EventEmitter<boolean>();
  @Input() IsShowSidePanel: boolean;
  @Output() IsShowSidePanelChange = new EventEmitter<boolean>();
  @Input() set IsMultipleSelectionRequired(value: boolean) {
    this.IsSelectMultiple = value;
    if (this.IsSelectMultiple) {
      this.SelectionMode = null;
    } else {
      this.SelectionMode = 'single';
    }
  }
  @Input() SelectionMode:  'single' | 'multiple' | null | undefined = 'single';
  @Input() Columns!: Array<TableColumn>;
  @Input() GridData: Array<any> = [];
  @Input() LocalStorageKey!: string;
  @Input() Widgets!: Array<WidgetItem>;
  @Output() WidgetItemClicked = new EventEmitter<WidgetItem>();
  @Input() IsShowAdditionalFilterButton = true;
  @Input() ListItems: Array<string> = [];
  @Output() SelectedListItemValueChange = new EventEmitter<string>();
  @Output() ShowAdditionalFilterClicked = new EventEmitter<boolean>();
  @Output() SeachClicked = new EventEmitter();
  @Input() ActionPanelItems: Array<ActionPanelItem> = [];
  @Output() ActionItemClicked = new EventEmitter<string>();
  @Input() MySelectionKey: string;
  @Input() SelectedItems: Array<any> = [];
  @Output() SelectedItemsChange = new EventEmitter<any>();
  @Output() DoubleClicked = new EventEmitter<any>();
  @Output() OnPageClicked = new EventEmitter<number>();

  // public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loadingTemplate!: TemplateRef<any>;
  public config = { 
    // animationType: ngxLoadingAnimationTypes.circleSwish, 
    backdropBorderRadius: '3px', 
    backdropBackgroundColour: '#ffffff' 
  };

  private newSeachCriteria!: SearchBase;
  private isScreenLoading: boolean;
  private subscription!: Subscription;

  constructor() {
    this.ActionPanelItems = new Array<ActionPanelItem>();
    this.IsSelectMultiple = false;
    this.IsShowSidePanel = true;
    this.IsShowHistory = true;
    this.IsShowShowHidePanelButton = true;
    this.isScreenLoading = true;
    this.MySelectionKey = '';
    this.SelectionMode = 'single';
    this.ItemsPerPage = GlobalVariable.ItemsPerPage;
    this.ActionMenuItems.push({ Id: 1, Icon: 'fa fa-refresh', ToolTipText: 'Refresh', Class: '' });
    this.ContextMenuItems = [
      { label: 'Save As CSV', icon: 'fa fa-download', command: (event) => this.exportToCSV() }
    ];
  }

  @HostListener('window:resize')
  onWindowResize() {
    setTimeout((() => {
      this.setSizing();
    }).bind(this), 500);
  }

  ngOnInit(): void {
    this.global = GlobalVariable;
    this.i18n = LangData[0];
    this.getSearchHistory();
    this.onSelectedKeysChange();
    this.subscription = this.TriggerSearch.subscribe(v => {
      this.onSearchClicked();
    });
  }

  ngAfterViewInit(): void {
    setTimeout((() => {
      this.setSizing();
      this.isScreenLoading = false;
    }).bind(this), 500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onWidgetItemClicked(widgetItem: WidgetItem): void {
    this.WidgetItemClicked.emit(widgetItem);
  }

  showHideHistory(): void {
    this.IsShowHistory = !this.IsShowHistory;
    this.IsShowHistoryChange.emit(this.IsShowHistory);
  }

  showHideSidePanel(): void {
    this.IsShowSidePanel = !this.IsShowSidePanel;
    this.IsShowSidePanelChange.emit(this.IsShowSidePanel);
  }

  onHistoryItemClicked(item: SearchBase): void {
    const properties = Object.keys(item);
    properties.forEach(element => {
      // Todo
      // item[element] = CommonFunction.ExtractDateAndOthersFromJson(item[element]);
    });
    Object.assign(this.CurrentSeachCriteria, item);
    this.onSearchClicked();
  }

  onItemChange(value: string) {
    this.SelectedListItemValueChange.emit(value);
  }

  onRowSelect() {
    this.onSelectedKeysChange();
  }

  onDblClick(item:any): void {
    this.DoubleClicked.emit(item);
  }

  onShowAdditionalFilterClicked(): void {
    if (!this.IsDataLoading) {
      this.ShowAdditionalFilterClicked.emit(true);
    }
  }

  onPageClicked(event: TableLazyLoadEvent): void {
    let currentPage: number;
    if (CommonFunction.IsNotNullOrUndefined(this.GridData)) {
      if (event.first === 0) {
        currentPage = 1;
      } else {
        currentPage = (event.first! / GlobalVariable.ItemsPerPage) + 1
      }

      if (this.CurrentSeachCriteria.PageNo !== currentPage) {
        this.CurrentSeachCriteria.PageNo = currentPage;
        this.onSearchClicked();
      }
    }
  }

  onRefresh(): void {
    this.onSearchClicked();
  }

  onEnterKeyPressed(event:any): void {
    if (event.keyCode === 13) {
      this.onSearchClicked();
    }
  }

  onSearchClicked(): void {
    this.setToLocalStorageList();
    this.IsShowHistory = false;
    this.IsShowHistoryChange.emit(this.IsShowHistory);
    this.SelectedItems = [];
    this.onSelectedKeysChange();
    this.SeachClicked.emit();
  }

  onActionItemClicked(key: string): void {
    let item: ActionPanelItem;
    if (this.ActionPanelItems.length > 0) {
      item = this.ActionPanelItems.filter(a => a.ActionPanelItemKey === key)[0];

      if (item !== undefined
        && !item.Disabled) {
        this.ActionItemClicked.emit(key);
      }
    }

  }

  exportToCSV(): void {
    this.dataTable.exportCSV();
  }

  private onSelectedKeysChange(): void {
    if (this.ActionPanelItems !== undefined
      && this.ActionPanelItems.length > 0) {
      if (this.SelectedItems.length > 1) {
        this.ActionPanelItems.forEach(api => {
          api.onMultiselect();
        });
      } else if (this.SelectedItems.length === 1) {
        this.ActionPanelItems.forEach(api => {
          api.onSingleSelect();
        });
      } else {
        this.ActionPanelItems.forEach(api => {
          if (api.IsDependOnSelection) {
            api.Disabled = true;
          } else {
            api.Disabled = false;
          }
        });
      }
    }
    this.SelectedItemsChange.emit(this.SelectedItems);
  }

  private setSizing(): void {
    if (this.MainContainer.nativeElement.offsetWidth <= 800) {
      this.IsShowShowHidePanelButton = false;
    } else {
      this.IsShowShowHidePanelButton = true;
    }
  }

  private setToLocalStorageList(): void {
    if (this.LocalStorageSearchList.SearchCirteriaList.IsNullOrEmpty()) {
      this.LocalStorageSearchList.SearchCirteriaList = new Array<any>();
    }
    this.setNewSearchCriteria();
    this.sortSearchList();
    window.localStorage.removeItem(this.LocalStorageKey);
    window.localStorage.setItem(this.LocalStorageKey, JSON.stringify(this.LocalStorageSearchList));
  }

  private setNewSearchCriteria(): void {
    this.CurrentSeachCriteria.SearchDateTime = new Date();
    this.CurrentSeachCriteria.convetToSearchString();
    const index = this.LocalStorageSearchList.SearchCirteriaList.findIndex(
      d => d.SearchCriteriaString === this.CurrentSeachCriteria.SearchCriteriaString);
    if (index >= 0) {
      this.LocalStorageSearchList.SearchCirteriaList.splice(index, 1);
    }

    if (this.LocalStorageSearchList.SearchCirteriaList.length === 5) {
      this.LocalStorageSearchList.SearchCirteriaList.pop();
    }

    this.newSeachCriteria = new SearchBase();
    Object.assign(this.newSeachCriteria, this.CurrentSeachCriteria);
    this.newSeachCriteria.FromDate = new Date(this.CurrentSeachCriteria.FromDate);
    this.newSeachCriteria.ToDate = new Date(this.CurrentSeachCriteria.ToDate);
    this.newSeachCriteria.SearchDateTime = new Date();
    this.LocalStorageSearchList.SearchCirteriaList.push(this.newSeachCriteria);
  }

  private async getSearchHistory(): Promise<void> {
    this.IsHistoryLoading = true;
    await this.fetchFromLocalStorage();
    await this.sortSearchList();
    this.IsHistoryLoading = false;
  }

  private fetchFromLocalStorage(): Promise<boolean> {
    const data: string = window.localStorage.getItem(this.LocalStorageKey) as string;
    this.LocalStorageSearchList = JSON.parse(data);
    if (CommonFunction.IsNullOrUndefined(this.LocalStorageSearchList)) {
      this.LocalStorageSearchList = new LocalStorageSearchList();
    }
    return new Promise(resolve => setTimeout(() => resolve(true), 500));
  }

  private sortSearchList(): Promise<boolean> {
    this.LocalStorageSearchList.SearchCirteriaList.sort((n1, n2) => {
      if (new Date(n1.SearchDateTime) < new Date(n2.SearchDateTime)) {
        return 1;
      }
      if (new Date(n1.SearchDateTime) > new Date(n2.SearchDateTime)) {
        return -1;
      }
      return 0;
    });
    return new Promise(resolve => resolve(true));
  }

  onCustomSort(event: SortEvent) {
    event.data = this.GridData;
    event.data.sort((data1, data2) => {
      //console.log(event.field);
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order! * result);
    });
  }


}

