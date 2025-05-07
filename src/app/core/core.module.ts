import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthorizationService } from './services/authorization.service';
import { AuthenticationService } from './services/authentication.service';
import { RouteManagerService } from './services/route-manager.service';
import { CanActivateGuard } from './services/can-activate.guard';
import { CanActivateChildGuard } from './services/can-activate-child.guard';
import { CanLoadGuard } from './services/can-load.guard';
import { LoaderService } from './services/loader.service';
import { ScreenService } from './services/screen.service';
import { LanguageConversionService } from './services/language-conversion.service';
import { CommonService } from './services/common.service';
//import { InitializationService } from '../initialization/initialization.service';
import { ActionPanelItemService } from '../shared/services/action-panel-item.service';
import { GlobalChangeNotifierService } from './services/global-change-notifier.service';
import { CommonApplicationService } from '../shared/services/common-application.service';
import { CheckForUpdateService } from './services/check-for-update.service';

// Normal imported modules

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        MessageService,
        AuthenticationService,
        AuthorizationService,
        RouteManagerService,
        CanActivateGuard,
        CanActivateChildGuard,
        CanLoadGuard,
        ConfirmationService,
        LoaderService,
        ScreenService,
        GlobalChangeNotifierService,
        LanguageConversionService,
        CommonService,
        CommonApplicationService,
        ActionPanelItemService,
        // InitializationService,
        CheckForUpdateService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class CoreModule { }
