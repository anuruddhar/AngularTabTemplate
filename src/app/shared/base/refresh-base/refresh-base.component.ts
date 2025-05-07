import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../base.component';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TabFormViewModel } from '../../models/tab-form-view.model';
import { TITLE } from 'src/app/title-module/title-module.module';

@Component({
  template: '<div></div>'
})
export class RefreshBaseComponent<T extends TabFormViewModel> extends BaseComponent<T> {

  constructor(
    routeManagerService: RouteManagerService,
    messageService: MessageService,
    router: Router,
    globalChangeNotifierService: GlobalChangeNotifierService,
    child: TabFormViewModel,
    @Inject(TITLE) title: string) {
    super(routeManagerService, messageService, router, globalChangeNotifierService, child, title);
    this.ActionMenuItems.push({ Id: 1, Icon: 'fa fa-refresh', ToolTipText: 'Refresh', Class: '' });
  }
}
