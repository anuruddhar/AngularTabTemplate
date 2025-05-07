import { Component } from '@angular/core';

import { BaseComponent } from 'src/app/shared/base/base.component';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UnAthorizedViewModel } from '../view-models/un-athorized-view.model';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.css']
})
export class UnAuthorizedComponent extends BaseComponent<UnAthorizedViewModel> {

  constructor(
    routeManagerService: RouteManagerService,
    router: Router,
    messageService: MessageService,
    globalChangeNotifierService: GlobalChangeNotifierService) {
    super(routeManagerService, messageService, router, globalChangeNotifierService, new UnAthorizedViewModel(), 'UNAUTHORIZED');
    this.routeManagerService.selectedTab.isDirty = false;
  }

}
