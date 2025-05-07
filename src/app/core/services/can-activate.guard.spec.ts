import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateGuard } from './can-activate.guard';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { RouteManagerService } from './route-manager.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

class MockActivatedRouteSnapshot {
  private data: any;
  url: any;
  root: any;
  get Data() {
     return this.data;
  }
}

xdescribe('Core: CanActivateGuard', () => {
  let service: CanActivateGuard;
  let mockAuthenticationService;
  let mockRouteManagerService;

  beforeEach (() => {
    mockAuthenticationService = jasmine.createSpyObj(['IsLoggedIn', 'GetUser']);
    mockRouteManagerService = jasmine.createSpyObj(['checkAndNavigate']);
    TestBed.configureTestingModule( {
    imports: [RouterTestingModule],
    providers: [
        CanActivateGuard,
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: RouteManagerService, useValue: mockRouteManagerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(CanActivateGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call canNavigate()', () => {
    const spyCanNavigate = spyOn(service, 'canNavigate').and.callThrough();
    service.canActivate(new ActivatedRouteSnapshot(),  new MockActivatedRouteSnapshot());
    expect(spyCanNavigate).toHaveBeenCalled();
  });

  it('should retrurn false if the user is not logged in', () => {
    const navigateSpy = spyOn(service.router, 'navigate');
    mockAuthenticationService.IsLoggedIn.and.returnValue(false);
    service.canNavigate('login').then((resolve) => {
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
      expect(resolve).toBeFalsy();
    });
  });

  it('should retrurn false if the user is logged in, but he is not allowed for a function', () => {
    const navigateSpy = spyOn(service.router, 'navigate');
    mockAuthenticationService.IsLoggedIn.and.returnValue(true);
    mockRouteManagerService.checkAndNavigate.and.returnValue(false);
    service.canNavigate('').then((resolve) => {
      expect(navigateSpy).toHaveBeenCalledWith(['/mdi/un-authorized']);
      expect(resolve).toBeFalsy();
    });
  });

  it('should retrurn true if the user is logged in and he is allowed for a function', () => {
    // const navigateSpy = spyOn(service.router, 'navigate');
    mockAuthenticationService.IsLoggedIn.and.returnValue(true);
    mockRouteManagerService.checkAndNavigate.and.returnValue(true);
    service.canNavigate('').then((resolve) => {
      expect(resolve).toBeTruthy();
    });
  });

});
