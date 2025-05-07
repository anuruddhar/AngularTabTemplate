import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';

import { PagingViewModel } from '../../models/page-view.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { TableColumn } from '../../models/table-column.interface';
import { LangData } from '../../lang-data';
import { AppException } from '../../models/common/app-exception';
// import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { SearchBase } from '../../models/search-base.model';
import { PagingBase } from '../../models/paging-base.model';
import { CommonApplicationService } from '../../services/common-application.service';
import { MessageType } from '../../utility/enum';
import { Global, GlobalVariable } from '../../globals';


@Component({
  template: '<div></div>'
})
export class SearchBaseComponent<T, SearchT extends SearchBase> implements OnInit {

  @Input()
  set griddata(data: PagingViewModel<T>) {
    if (data !== undefined && data !== null) {
      this.ItemData = data;
    }
  }

  @Input()
  set showsidepanel(value: boolean) {
    this.showSidePanel = value;
  }

  @Input()
  set selectitem(value: any) {
    if (value !== undefined && value !== '') {
      if (this.ItemData instanceof AppException) {
        this.logAppError(this.ItemData);
      } else {
        this.ItemData.RowData = [];
      }

      this.modelSearch.SearchString = value;
      this.onSearch();
    }
  }

  @Output() select: EventEmitter<T> = new EventEmitter<T>();


  public IsDataLoading = false;
  RowsPerPageOptions: Array<number> = [10, 20, 50, 100];
  // ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  loadingTemplate!: TemplateRef<any>;
  config = { 
    //animationType: ngxLoadingAnimationTypes.circleSwish, 
    backdropBorderRadius: '3px', 
    backdropBackgroundColour: '#ffffff' };
  cols!: Array<TableColumn>;
  i18n: any;
  global: Global;
  // errorMessage: string;
  ItemData: PagingViewModel<T> = new PagingViewModel<T>();
  modelSearch: SearchT;
  selected!: T;
  showSidePanel: boolean;

  constructor(public loaderService: LoaderService, public commonApplicationService: CommonApplicationService, public child: SearchBase) {
    this.modelSearch = this.child as SearchT;
    this.i18n = LangData[0];
    this.global = GlobalVariable;
    this.populateCols();
    this.showSidePanel = true;
  }

  private logAppError(error: AppException) {
    console.log(`error: ${error.ErrorCode} - ${error.Message}`);
  }

  protected populateCols(): void { }

  ngOnInit(): void {
    this.pageOnInit();
  }

  protected pageOnInit(): void { }

  protected fetchData(): void { }

  // tslint:disable-next-line: member-ordering
  observer = {
    next: (data: PagingViewModel<T>) => {
      this.ItemData = data;
      if (this.ItemData.RowData.length === 1) {
        this.select.emit(this.ItemData.RowData[0]);
      }
    },
    error: (error: AppException) => {
      this.commonApplicationService.showMessage(MessageType.Error, 'Error', error.Message)
    },
    complete: () => { this.IsDataLoading = false; }
  };

  onSearchClicked(): void {
    this.onSearch();
  }

  onSearch(): void {
    this.modelSearch.PageNo = 1;
    this.fetchData();
  }

  onSelect(item: T): void {
    this.select.emit(item);
  }

  onRowSelect(): void {
    this.select.emit(this.selected);
  }

  onEnter(event: any): void {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  onResetSearch(): void {
    this.modelSearch.SearchString = '';
  }

  // Paging Method
  onItemsPerPageChanged(itemsPerPage: any): void {
    this.modelSearch.PageNo = 1;
    this.modelSearch.ItemsPerPage = itemsPerPage.value;
    this.fetchData();
  }

  onPageNoChange(pageNo: number): void {
    this.modelSearch.PageNo = pageNo;
    this.fetchData();
  }
  // Paging Method
}
