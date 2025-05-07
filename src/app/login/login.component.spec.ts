// import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule, ActivatedRoute, Data, Params } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { DebugElement } from '@angular/core';
// import { Observable } from 'rxjs/observable';
// import { Subject } from 'rxjs/Subject';
// import { MessageService } from 'primeng/api';
// import { DropdownModule } from 'primeng/components/dropdown/dropdown';

// import { AppLoginComponent } from './app-login.component';
// import { AuthService } from '../services/auth.service';
// import { LangService } from '../services/lang.service';
// import { LoaderService } from '../services/loader.service';
// import { UserData } from '../unit-test-data/login-temp';
// import { GlobalVariable } from '../globals';
// import { asyncError, asyncData } from '../utility/async-observable-helpers';
// import { ResourceData } from '../unit-test-data/get-local-resource.data';
// import { LangData } from '../lang.data';
// import { InventoryLocation } from '../models/inventory-location.model';

// class RouterStub {
//   navigate(params) { }
// }

// class ActivatedStub {
//   private subject = new Subject();

//   push(value) {
//     this.subject.next(value);
//   }

//   get params() {
//     return this.subject.asObservable();
//   }
// }

describe('Framework: AppLoginComponent', () => {
  // let component: AppLoginComponent;
  // let fixture: ComponentFixture<AppLoginComponent>;
  // let authService: AuthService;
  // let langService: LangService;
  // let messageService: MessageService;
  // let messageServiceSpy: jasmine.Spy;
  // let router: Router;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientModule, BrowserAnimationsModule, FormsModule, RouterModule, DropdownModule],
  //     declarations: [AppLoginComponent],
  //     providers: [LangService, LoaderService, AuthService, MessageService,
  //       { provide: Router, useClass: RouterStub },
  //       {
  //         provide: ActivatedRoute,
  //         useValue: {
  //           data: {
  //             subscribe: (fn: (value: Data) => void) => fn({
  //               loginData: UserData,
  //             }),
  //           },
  //           params: {
  //             subscribe: (fn: (value: Params) => void) => fn({
  //               tab: 0,
  //             }),
  //           }
  //         },
  //       }
  //     ]
  //   })
  //     .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AppLoginComponent);
  //   router = TestBed.inject(Router);
  //   component = fixture.componentInstance;
  //   authService = fixture.debugElement.injector.get(AuthService);
  //   langService = fixture.debugElement.injector.get(LangService);
  //   messageService = fixture.debugElement.injector.get(MessageService);
  //   messageServiceSpy = spyOn(messageService, 'add').and.callThrough();
  // });


  // it('should initialize the user when the onInit() is called', () => {
  //   const checkInventoryLocationSpy = spyOn(component, 'checkInventoryLocation').and.callThrough();
  //   const getLocalResourceSpy = spyOn(component, 'getLocalResource').and.callThrough();
  //   fixture.detectChanges();
  //   expect(component.loginUser.UserLogin.UserID).toEqual(UserData.User.UserLogin.UserID);
  //   expect(checkInventoryLocationSpy).toHaveBeenCalledTimes(1);
  //   expect(getLocalResourceSpy).toHaveBeenCalledTimes(1);
  // });


  // it('should create an inventory location list if there are more than one inventory location assigned to the user', () => {
  //   const createInventoryLocationListSpy = spyOn(component, 'createInventoryLocationList').and.callThrough();
  //   fixture.detectChanges();
  //   //  This will be true as the mock data returns an object with more inventory locations.
  //   expect(createInventoryLocationListSpy).toHaveBeenCalledTimes(1);
  //   expect(component.invetoryLocations.length).toBeGreaterThan(1);
  // });


  // it('should push the resorce file to the "LangData"', fakeAsync(() => {
  //   const spy = spyOn(langService, 'GetLocaleResource').and.returnValue(asyncData(ResourceData));
  //   component.getLocalResource();
  //   tick();
  //   expect(LangData).not.toBeNull();
  //   expect(LangData.length).toBeGreaterThan(0);
  // }));


  // it('should display a message if the language resource fetch failed!', fakeAsync(() => {
  //   const spy = spyOn(langService, 'GetLocaleResource').and.returnValue(asyncError<String>('Error occurred'));
  //   component.getLocalResource();
  //   tick();
  //   expect(messageServiceSpy).toHaveBeenCalledTimes(1);
  // }));


  // it('should set the default inventory location as the first location when "setSelectedInventoryLocation()" is \
  //    called with no selection of inventory location', () => {
  //     fixture.detectChanges();
  //     component.selectedInventoryLocationId = 0;
  //     component.setSelectedInventoryLocation();
  //     expect(component.loginUser.DefaultInventoryLocation.InventoryLocationId)
  //       .toEqual(component.loginUser.InventoryLocationList[0].InventoryLocationId);
  //   });


  // it('should set the default inventory location as the selected inventory location when "setSelectedInventoryLocation()" is called', () => {
  //   fixture.detectChanges();
  //   component.selectedInventoryLocationId = 59;
  //   component.setSelectedInventoryLocation();
  //   expect(component.loginUser.DefaultInventoryLocation.InventoryLocationId)
  //     .toEqual(59);
  // });


  // it('should set the default inventory location as the first location when "setSelectedInventoryLocation()" is \
  // called with invalid selection of inventory location', () => {
  //     fixture.detectChanges();
  //     component.selectedInventoryLocationId = 10001;
  //     component.setSelectedInventoryLocation();
  //     expect(component.loginUser.DefaultInventoryLocation.InventoryLocationId)
  //       .toEqual(component.loginUser.InventoryLocationList[0].InventoryLocationId);
  // });


  // it('should allow to login if UserID is NOT empty and inventory location is selected', () => {
  //   const routeToMainPageSpy = spyOn(component, 'routeToMainPage').and.callThrough();
  //   fixture.detectChanges();
  //   component.login();
  //   expect(messageServiceSpy).toHaveBeenCalledTimes(0);
  //   expect(routeToMainPageSpy).toHaveBeenCalledTimes(1);
  // });


  // it('should NOT allow to login if inventory location is empty and raise a message instead', () => {
  //   const routeToMainPageSpy = spyOn(component, 'routeToMainPage').and.callThrough();
  //   fixture.detectChanges();
  //   let oldLocationId: number;
  //   oldLocationId = component.selectedInventoryLocationId;
  //   component.selectedInventoryLocationId = 0;
  //   component.login();
  //   expect(messageServiceSpy).toHaveBeenCalledTimes(1);
  //   expect(routeToMainPageSpy).not.toHaveBeenCalled();
  //   component.selectedInventoryLocationId = oldLocationId;
  //   fixture.detectChanges();
  // });


  // it('should NOT allow to login if UserID is empty and raise a message instead', () => {
  //   const routeToMainPageSpy = spyOn(component, 'routeToMainPage').and.callThrough();
  //   fixture.detectChanges();
  //   let userId: string;
  //   userId = component.loginUser.UserLogin.UserID;
  //   component.loginUser.UserLogin.UserID = '';
  //   component.login();
  //   expect(messageServiceSpy).toHaveBeenCalledTimes(1);
  //   expect(routeToMainPageSpy).not.toHaveBeenCalled();
  //   component.loginUser.UserLogin.UserID = userId;
  //   fixture.detectChanges();
  // });


  // it('should allow to login if UserID is NOT empty and inventory location is selected', () => {
  //   const routeToMainPageSpy = spyOn(component, 'routeToMainPage').and.callThrough();
  //   fixture.detectChanges();
  //   component.login();
  //   expect(messageServiceSpy).toHaveBeenCalledTimes(0);
  //   expect(routeToMainPageSpy).toHaveBeenCalledTimes(1);
  // });


  // it('should directly go to the main page if only one inventory location is assgined to the user', () => {
  //   const routeToMainPageSpy = spyOn(component, 'routeToMainPage').and.callThrough();
  //   fixture.detectChanges();
  //   let invetoryLocations: InventoryLocation[];
  //   invetoryLocations = Object.assign(component.loginUser.InventoryLocationList);

  //   component.loginUser.InventoryLocationList = [{
  //     InventoryLocationId: 1, InventoryDisplayName: 'InventoryDisplayName',
  //     IsDefault: false, TestStationId: 1, TestStationName: 'TestStationName'
  //   }];
  //   component.checkInventoryLocation();
  //   expect(routeToMainPageSpy).toHaveBeenCalledTimes(1);
  //   component.loginUser.InventoryLocationList = invetoryLocations;
  //   fixture.autoDetectChanges();
  // });


  // it('should call the "setSelectedInventoryLocation()" & "setGlobalVaribleData()" when routeToMainPage() is called', () => {
  //   const routerSpy = spyOn(router, 'navigate').and.callThrough();
  //   const setSelectedInventoryLocationSpy = spyOn(component, 'setSelectedInventoryLocation').and.callThrough();
  //   const setGlobalVaribleDataSpy = spyOn(component, 'setGlobalVaribleData').and.callThrough();
  //   fixture.detectChanges();
  //   component.routeToMainPage();
  //   expect(routerSpy).toHaveBeenCalledWith(['/main']);
  //   expect(setSelectedInventoryLocationSpy).toHaveBeenCalledTimes(1);
  //   expect(setGlobalVaribleDataSpy).toHaveBeenCalledTimes(1);
  // });


  // it('should set the Global Varialbes when the "setGlobalVaribleData()" is called', () => {
  //   fixture.detectChanges();
  //   component.setGlobalVaribleData();
  //   expect(GlobalVariable.UserData).toEqual(component.loginUser);
  //   expect(GlobalVariable.InventoryLocation).toEqual(GlobalVariable.UserData.DefaultInventoryLocation);
  //   expect(GlobalVariable.UserID).toEqual(GlobalVariable.UserData.User.UserLogin.UserID);
  //   expect(GlobalVariable.ApplicationModuleFunctions).toEqual(GlobalVariable.UserData.User.FunctionList);
  // });

});
