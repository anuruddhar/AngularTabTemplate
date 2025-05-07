import { Component, OnInit, OnDestroy, AfterViewInit, TemplateRef, ViewChildren, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { FormControlName, FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

//import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Table } from 'primeng/table';
import { MessageService, MenuItem } from 'primeng/api';

import { RouteManagerService } from '../../core/services/route-manager.service';
import { ActionMenuItem } from '../models/action-menu-item.model';
import { MessageType } from '../utility/enum';
import { TabFormViewModel } from '../models/tab-form-view.model';
import { LangData } from '../lang-data';
import { GlobalVariable, Global } from '../globals';
import { AppException } from '../models/common/app-exception';
import { SvxResult } from '../models/svxresult.model';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';
import '../utility/extension-method';
import { CommonFunction } from '../utility/common-function';
import { GenericValidator } from '../utility/generic-validator';
import { TITLE } from 'src/app/title-module/title-module.module';
import { RouteConstant } from '../route-constant';

@Component({
  template: '<div></div>'
})
export class BaseComponent<T extends TabFormViewModel> implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];
  Title: string = '';
  MyTabId: string;
  IsSplitView: boolean = false;
  IsShowFilterPanel = false;
  ActionMenuItems: Array<ActionMenuItem> = [];
  i18n: any;
  global: Global;
  ModalWidth: number = 0;
  FormViewModel: T;
  //dataTable: Table;
  @ViewChild('dt') dataTable!: Table;
  ContextMenuItems: Array<MenuItem>;
  RowsPerPageOptions: Array<number> = [10, 20, 50, 100];
  IsDataLoading = false;
  SvxResult: SvxResult = new SvxResult();
  YearRageForCalendarControl = '1900:2200';

  protected genericValidator!: GenericValidator;
  //public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    //animationType: ngxLoadingAnimationTypes.circleSwish, backdropBorderRadius: '3px',
    backdropBackgroundColour: '#00000000'
  };
  private sub: any;
  private subscription: Subscription;

  @HostListener('document:keydown.control.s', ['$event']) onCtrlSHandler(event: KeyboardEvent) {
    event.preventDefault();
    console.log('document:keydown.control.s');
    this.onCtlrSPressed(); // This shortcut is meant for save.
  }

  @HostListener('document:keydown.control.shift.c', ['$event']) onCtrlShiftCHandler(event: KeyboardEvent) {
    event.preventDefault();
    console.log('document:keydown.control.shift.c');
    this.onCtlrShiftCPressed(); // This shortcut is meant for save and continue. Used in STD and Lite Initialization.
  }

  @HostListener('document:keydown.control.shift.a', ['$event']) onCtrlShiftAHandler(event: KeyboardEvent) {
    event.preventDefault();
    console.log('document:keydown.control.shift.a');
    this.onCtrlShiftAPressed(); // This shortcut is meant for show/hide advanced search.
  }


  constructor(
    public routeManagerService: RouteManagerService,
    public messageService: MessageService,
    public router: Router,
    public globalChangeNotifierService: GlobalChangeNotifierService,
    private child: TabFormViewModel,
    @Inject(TITLE) title: string) { // private child: new () => T  private child: TabFormViewModel
    this.global = GlobalVariable;
    this.i18n = LangData[0];
    this.ContextMenuItems = [
      { label: 'Save As CSV', icon: 'fa fa-download', command: (event) => this.exportToCSV() }
    ];
    this.MyTabId = '';
    this.FormViewModel = this.child as T; //  new this.child(); this.child as T;
    this.sub = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.putToBundle();
      } else if (e instanceof NavigationEnd) { // This is needed if teh navigation happens between two similar routes
        this.MyTabId = this.routeManagerService.selectedTab.id;
        this.getFromBundle();
        // this.pageOnResume();
      }
    });
    this.subscription = this.globalChangeNotifierService.getILCode().subscribe(ilCode => {

    });
    if( title !== '') {
      this.Title = this.i18n[title] ;
    }
  }


  exportToCSV(): void {
    this.dataTable.exportCSV();
  }

  onTextCopied(): void {
    this.showMessage(MessageType.Info,this.i18n.COPY_TO_CLIPBOARD, this.i18n.ITEM_COPIED);
  }


  async ngOnInit(): Promise<void> {
    this.MyTabId = this.routeManagerService.selectedTab.id;
    this.getFromBundle(); // Get the previous data to be displayed in the tab (This is mainly for the tab navigation)
    this.routeManagerService.selectedTab.isDirty = false;
    setTimeout(() => {
      this.routeManagerService.setTitle(this.MyTabId, this.Title);
    }, 100);
    if (CommonFunction.IsNullOrUndefined(this.routeManagerService.selectedTab.tabFormViewModel)) {
      this.pageOnInit();
      this.routeManagerService.deleteDummy();
    } else {
      if (CommonFunction.IsNotNullOrUndefined(this.FormViewModel.FormGroup)) {
        this.routeManagerService.selectedTab.isDirty = this.FormViewModel.FormGroup.dirty;
      }
      this.pageOnResume();
    }
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    if (CommonFunction.IsNotNullOrUndefined(this.FormViewModel.FormGroup)) {
      merge(this.FormViewModel.FormGroup.valueChanges, ...controlBlurs).pipe(
        debounceTime(800)
      ).subscribe(value => {
        this.FormViewModel.DisplayMessage = this.genericValidator.processMessages(this.FormViewModel.FormGroup);
        this.routeManagerService.selectedTab.isDirty = this.FormViewModel.FormGroup.dirty;
      });
    }

    this.pageAfterViewInit();
  }

  ngOnDestroy(): void {
    this.putToBundle();
    this.pageOnDestroy();
    this.sub.unsubscribe();
    this.subscription.unsubscribe();
  }

  putToBundle(): void {
    this.routeManagerService.setWorkingTab(this.MyTabId);
    if (this.routeManagerService.workingTab != null) {
      this.resetSearchObjects();
      this.routeManagerService.workingTab.tabFormViewModel = this.getFormData();
    }
  }

  getFromBundle(): void {
    this.routeManagerService.setWorkingTab(this.MyTabId);
    if (this.routeManagerService.workingTab != null) {
      if (this.routeManagerService.workingTab.tabFormViewModel != null) {
        this.setFormData(this.routeManagerService.workingTab.tabFormViewModel as T);
      }
    }
  }

  showMessage(mesageType: MessageType, title: string, message: string): void {
    switch (mesageType) {
      case MessageType.Success:
        this.messageService.add({ severity: 'success', summary: title, detail: message });
        break;
      case MessageType.Info:
        this.messageService.add({ severity: 'info', summary: title, detail: message });
        break;
      case MessageType.Warning:
        this.messageService.add({ severity: 'warn', summary: title, detail: message });
        break;
      case MessageType.Error:
        this.messageService.add({ severity: 'error', summary: title, detail: message });
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

  onShowHideFilters(): void {
    this.FormViewModel.IsShowAdditionalCriteriaPopup = !this.FormViewModel.IsShowAdditionalCriteriaPopup;
  }

  closePage(urlToNavigate: string): void {
    this.routeManagerService.deleteTab(this.MyTabId, urlToNavigate);
  }

  protected resetSearchObjects(): void { }

  protected pageOnInit(): void { }

  protected pageOnResume(): void { }

  protected pageAfterViewInit(): void { }

  protected pageOnDestroy(): void { }

  protected resetFormAsPristine(): void {
    this.FormViewModel.FormGroup.markAsPristine();
    this.FormViewModel.FormGroup.markAsUntouched();
    this.routeManagerService.selectedTab.isDirty = false;
  }

  protected logError(error: string, isShow: boolean) {
    if (isShow) {
      this.showMessage(MessageType.Error, this.Title, error);
    }
    // #todo log error
  }

  protected logAppError(error: AppException) {
    console.log(`error: ${error.ErrorCode} - ${error.Message}`);
  }

  //#region KeyBoard Events
  protected onCtlrSPressed(): void { }
  protected onCtlrShiftCPressed(): void { }
  protected onCtrlShiftAPressed(): void {
    this.onShowHideFilters();
  }
  //#endregion

  public IsNotException(object: any): boolean {
    return !(object instanceof AppException);
  }


  private getFormData(): T { return this.FormViewModel; }

  private setFormData(tabFormViewModel: T): void { this.FormViewModel = tabFormViewModel; }

  protected initFormGroup(form: FormGroup, data: any) {
    try {
      for (const key in form.controls) {
        if (form.controls[key] instanceof FormControl) {
          if (data[key]) {
            const control = form.controls[key] as FormControl;
            control.setValue(CommonFunction.ExtractDateAndOthersFromJson(data[key]));
          }
        } else if (form.controls[key] instanceof FormGroup) {
          if (data[key]) {
            this.initFormGroup(form.controls[key] as FormGroup, data[key]);
          }
        }
      }
    } catch (error: any) {
      this.logError(error, true);
    }
  }

  protected assignObject(): void {
    // Object.assign(this.FormViewModel, this.FormViewModel.FormGroup.getRawValue());
    Object.assign(this.FormViewModel, this.FormViewModel.FormGroup.value);
  }

  protected navigatToItemDisplay(barcode: string): void {
    this.router.navigate(['mdi/' + RouteConstant.ITEM_DISPLAY + '/' + barcode]);
  }

}
