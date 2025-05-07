import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ActionPanelItem } from '../models/common/action-panel-item.model';
import { Constant } from '../utility/constant';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import '../utility/extension-method';
import { LangData } from '../lang-data';
import { LanguageConversionService } from 'src/app/core/services/language-conversion.service';

@Injectable()
export class ActionPanelItemService {

  i18n: any;
  private actionPanelItems: Array<ActionPanelItem>;
  private actionPanelItem: ActionPanelItem;

  constructor(private authorizationService: AuthorizationService,
    private languageConversionService: LanguageConversionService,
    private _ngZone: NgZone) {
    this.i18n = LangData[0];
    this.actionPanelItem = new ActionPanelItem();
    this.actionPanelItems = new Array<ActionPanelItem>();
    this.generateActionPanelItemList();
    this.subscribeLanguageChangeEvent();
  }

  private subscribeLanguageChangeEvent(): void {
    this.languageConversionService.LanguageChanged.subscribe((locale: string) => {
      this._ngZone.run(() => {
        this.i18n = LangData[0];

        this.actionPanelItems = [];
        this.generateActionPanelItemList();
      });
    });	  
  }

  getActionalPanelList(actionPanelItemLinkedWith: string): Observable<Array<ActionPanelItem>> {
    let selectedActionPanelItems: Array<ActionPanelItem>;
    selectedActionPanelItems = new Array<ActionPanelItem>();

    if (this.actionPanelItems.IsNotNullOrEmpty()) {
        this.actionPanelItems.forEach(element => {
          if (element.ActionPanelItemLinkedWith.indexOf(actionPanelItemLinkedWith) >= 0
              && this.authorizationService.isAuthorized(element.FunctionCode)) {
                selectedActionPanelItems.push(element);
           }
        });
    }

    return of(selectedActionPanelItems);
  }

  private generateActionPanelItemList(): void {
    this.addInitializationActionPanelItems();
  }

  private addInitializationActionPanelItems(): void {
    this.actionPanelItem = new ActionPanelItem();
    this.actionPanelItem.ActionPanelItemKey = Constant.ActionPanelItemKey.KEY_INITIALIZE_ITEM;
    this.actionPanelItem.ActionPanelItemLinkedWith.push(Constant.ActionOrWidgetLinkedWith.ITEM_SUPERVISION);
    this.actionPanelItem.FunctionCode = Constant.FunctionCode.FC_MNU_STANDARD_INITIALIZATION;
    this.actionPanelItem.Description = this.i18n.keyInitializeItem;
    this.actionPanelItem.IsDependOnSelection = false;
    this.actionPanelItem.Icon = Constant.Icon.IC_STD_INITIALIZATION;
    this.actionPanelItems.push(this.actionPanelItem);

    this.actionPanelItem = new ActionPanelItem();
    this.actionPanelItem.ActionPanelItemKey = Constant.ActionPanelItemKey.KEY_MODIFY_ITEM_DATA;
    this.actionPanelItem.ActionPanelItemLinkedWith.push(Constant.ActionOrWidgetLinkedWith.ITEM_SUPERVISION);
    this.actionPanelItem.FunctionCode = Constant.FunctionCode.FC_MNU_ITEM_SUPERVISION;
    this.actionPanelItem.Description = this.i18n.keyModifyItem;
    this.actionPanelItem.Icon = Constant.Icon.IC_MODIFY_ITEM;
    this.actionPanelItems.push(this.actionPanelItem);

  }

}
