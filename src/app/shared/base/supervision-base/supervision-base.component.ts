import { Component, OnInit, Inject } from '@angular/core';
import { TabFormViewModel } from '../../models/tab-form-view.model';
import { BaseComponent } from '../base.component';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';
import { Global } from '../../globals';
import { Subject } from 'rxjs';
import { TITLE } from 'src/app/title-module/title-module.module';

@Component({
  template: '<div></div>'
})


// It seems this class is not required since TriggerSearch moved to ViewModel
export class SupervisionBaseComponent<T extends TabFormViewModel> extends BaseComponent<T> {

  override global: Global = new Global();
  TriggerSearch: Subject<boolean> = new Subject();


  constructor(
    routeManagerService: RouteManagerService,
    messageService: MessageService,
    router: Router,
    globalChangeNotifierService: GlobalChangeNotifierService,
    child: TabFormViewModel,
    @Inject(TITLE) title: string) {
    super(routeManagerService, messageService, router, globalChangeNotifierService, child, title);
  }


  onSearchClicked(): void {
    this.TriggerSearch.next(true);
    this.onShowHideFilters();
  }

}
