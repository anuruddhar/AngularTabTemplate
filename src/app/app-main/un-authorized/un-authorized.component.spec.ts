import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { LangData } from 'src/app/shared/lang-data';
import { TabFormViewModel } from 'src/app/shared/models/tab-form-view.model';
import { Tab } from 'src/app/shared/models/tab-model';
import { TitleModuleModule } from 'src/app/title-module/title-module.module';

import { UnAuthorizedComponent } from './un-authorized.component';

describe('UnAuthorizedComponent', () => {
  let component: UnAuthorizedComponent;
  let fixture: ComponentFixture<UnAuthorizedComponent>;
  let routeManagerService;

  beforeEach(async(() => {
    LangData.push([]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TitleModuleModule],
      declarations: [ UnAuthorizedComponent ],
      providers: [ RouteManagerService, AuthorizationService, MessageService, GlobalChangeNotifierService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    routeManagerService = TestBed.inject(RouteManagerService);
    routeManagerService.tabs = new Array<Tab>();
    routeManagerService.tabs.push({ id: 1, title: 'Page1', url: '', tabFormViewModel: new TabFormViewModel(), isDirty: false });
    routeManagerService.selectedTab = routeManagerService.tabs[0];
    fixture = TestBed.createComponent(UnAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
