import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MessageService } from 'primeng/api';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';
import { DummyViewModel } from '../view-models/dummy-view.model';

@Component({
  selector: 'app-dummy',
  template: '<div>Hi from dummy</div>'
})
export class DummyComponent extends BaseComponent<DummyViewModel> {

  constructor(
    routeManagerService: RouteManagerService,
    messageService: MessageService,
    globalChangeNotifierService: GlobalChangeNotifierService,
    router: Router) {
    super(routeManagerService, messageService, router, globalChangeNotifierService, new DummyViewModel(), '');
  }


  // pageOnInit(): void {
  //   this.Title = 'RD';
  //   this.routeManagerService.routeFromDummyToActual();
  // }

}
