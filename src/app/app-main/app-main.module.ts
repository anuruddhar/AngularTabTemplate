import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MdiComponent } from './mdi/mdi.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppSubMenuComponent } from './app-sub-menu/app-sub-menu.component';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppRightPanelComponent } from './app-right-panel/app-right-panel.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { mdiRoutes } from './app-main.routes';
import { DummyComponent } from './dummy/dummy.component';

@NgModule({
  declarations: [
    MdiComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppRightPanelComponent,
    UnAuthorizedComponent,
    DummyComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(mdiRoutes),
  ],
  exports: [
    AppMenuComponent,
    AppSubMenuComponent
  ]
})
export class AppMainModule { }
