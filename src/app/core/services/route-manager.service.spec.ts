import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RouteManagerService } from './route-manager.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorizationService } from './authorization.service';
import { Tab } from 'src/app/shared/models/tab-model';
import { TabFormViewModel } from 'src/app/shared/models/tab-form-view.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

fdescribe('Core: RouterManagerService', () => {
  let service: RouteManagerService;
  let mockAuthorizationService!: any;

  beforeEach(() => {
    mockAuthorizationService = jasmine.createSpyObj(['isAuthorizedByRoute']);
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
        RouteManagerService,
        { provide: AuthorizationService, useValue: mockAuthorizationService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(RouteManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.tabs.length).toEqual(0);
    expect(service.currentUrl).toEqual('');
    expect(service.isNavigationFromTab).toBeFalsy();
  });

  describe('checkAndNavigate() function: ', () => {
    it(`should allow to navigate to MDI `, () => {
      const result = service.checkAndNavigate('/mdi');
      expect(service.tabs.length).toEqual(0);
      expect(service.selectedTab).toBeNull();
      expect(result).toBeTruthy();
    });

    it(`should not allow to navigate if the route is already active`, () => {
      service.selectedTab = new Tab();
      service.selectedTab.url = '/test';
      const result = service.checkAndNavigate('/test');
      expect(result).toBeFalsy();
    });

    it(`should activate the inactive tab if the user clicks on an inactive tab`, () => {
      const tab = new Tab();
      tab.url = '/test';
      service.tabs = new Array<Tab>();
      service.tabs.push(tab);
      const result = service.checkAndNavigate('/test');
      expect(result).toBeTruthy();
    });

    it(`should not allow to navigate if the user is authorized`, () => {
      mockAuthorizationService.isAuthorizedByRoute.and.returnValue(true);
      const result = service.checkAndNavigate('/test');
      expect(result).toBeTruthy();
    });

    it(`should not allow to navigate if the user is not authorized`, () => {
      mockAuthorizationService.isAuthorizedByRoute.and.returnValue(false);
      const result = service.checkAndNavigate('/test');
      expect(result).toBeFalsy();
    });
  });


  describe('addTab() function: ', () => {
    it(`should create new 'tab' collection if the collection is empty`, () => {
      service.tabs = [];
      service.addTab();
      expect(service.tabs).not.toBeNull();
    });

    it(`should create new 'tab' and added to the collection`, () => {
      service.tabs = [];
      service.currentUrl = '/test';
      service.addTab();
      expect(service.tabs[0].title).toBe('Loading...');
      expect(service.tabs[0].url).toBe('/test');
      expect(service.tabs[0].isDirty).toBeTruthy();
      expect(service.selectedTabIndex).toBe(0);
      expect(service.selectedTab).toEqual(service.tabs[0]);
    });
  });

  it(`should select the tab based on the passed 'Id'`, () => {
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '2', title: 'Page2', url: '', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '3', title: 'Page3', url: '', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.selectTab('2');
    expect(service.selectedTabIndex).toBe(1);
    expect(service.selectedTab).toEqual(service.tabs[service.selectedTabIndex]);
  });

  it(`should set the 'selectedTabIndex' as '-1', if there are no tabs`, () => {
    service.tabs = new Array<Tab>();
    service.selectTab('2');
    expect(service.selectedTabIndex).toBe(-1);
  });

  it(`should navigate to the 'last page' when a tab is removed`, () => {
    const navigateSpy = spyOn(service.router, 'navigate');
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '/testPage1', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '2', title: 'Page2', url: '/testPage2', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '3', title: 'Page3', url: '/testPage3', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.deleteTab('2', '');
    expect(navigateSpy).toHaveBeenCalledWith(['/testPage3']);
  });

  it(`should navigate to the 'previous page' when last page is removed`, () => {
    const navigateSpy = spyOn(service.router, 'navigate');
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '/testPage1', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '2', title: 'Page2', url: '/testPage2', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '3', title: 'Page3', url: '/testPage3', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.deleteTab('3','');
    expect(navigateSpy).toHaveBeenCalledWith(['/testPage2']);
  });

  it(`should navigate to the 'landing page' when a tab is removed`, () => {
    const navigateSpy = spyOn(service.router, 'navigateByUrl');
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '/testPage1', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.deleteTab('1', '');
    expect(navigateSpy).toHaveBeenCalledWith('mdi');
  });

  it(`should return true when the 'isActive()' is called when click on the activated tab`, () => {
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '/testPage1', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '2', title: 'Page2', url: '/testPage2', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.selectedTab = service.tabs[0];
    expect(service.isActive('1')).toBeTruthy();
  });

  it(`should return false when the 'isActive()' is called when click on the in active tab`, () => {
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '/testPage1', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '2', title: 'Page2', url: '/testPage2', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.selectedTab = service.tabs[0];
    expect(service.isActive('2')).toBeFalsy();
  });

  it(`should set the title of a given tab when 'setTitle() is called`, () => {
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '/testPage1', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.setTitle('1', 'Tab 1');
    expect(service.tabs[0].title).toBe('Tab 1');
  });

  it(`should set the working tab when 'setWorkingTab() is called`, () => {
    service.tabs = new Array<Tab>();
    service.tabs.push({ id: '1', title: 'Page1', url: '/testPage1', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.tabs.push({ id: '2', title: 'Page2', url: '/testPage2', tabFormViewModel: new TabFormViewModel(), isDirty: false});
    service.setWorkingTab('1');
    expect(service.workingTab).toBe(service.tabs[0]);
  });

});

