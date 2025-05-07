import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';
import { CanActivateChildGuard } from './can-activate-child.guard';
import { RouteManagerService } from './route-manager.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/globals';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

class MockActivatedRouteSnapshot {
  private data: any;
  url: any;
  root: any;
  get Data(){
     return this.data;
  }
}

xdescribe('Core: RouteGuardService', () => {
  let service: CanActivateChildGuard;
  let mockAuthenticationService;
  let mockRouteManagerService;

  beforeEach (() => {
    mockAuthenticationService = jasmine.createSpyObj(['IsLoggedIn', 'GetUser']);
    mockRouteManagerService = jasmine.createSpyObj(['checkAndNavigate']);
    TestBed.configureTestingModule( {
    imports: [RouterTestingModule],
    providers: [
        CanActivateChildGuard,
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: RouteManagerService, useValue: mockRouteManagerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(CanActivateChildGuard);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should call canNavigate()', () => {
    // const navigateSpy = spyOn(service.router, 'navigate');
    const spyCanNavigate = spyOn(service, 'canNavigate').and.callThrough();
    service.canActivateChild(new ActivatedRouteSnapshot(), new MockActivatedRouteSnapshot());
    expect(spyCanNavigate).toHaveBeenCalled();
  });

  it('should retrurn false if the user is not logged in', () => {
    const navigateSpy = spyOn(service.router, 'navigate');
    service.canNavigate('/login').then((resolve) => {
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
      expect(resolve).toBeFalsy();
    });
  });

  it('should retrurn false if the user is logged in, but he is not allowed for a function', () => {
    const navigateSpy = spyOn(service.router, 'navigate');
    service.canNavigate('').then((resolve) => {
      expect(navigateSpy).toHaveBeenCalledWith(['/mdi/un-authorized']);
      expect(resolve).toBeFalsy();
    });
  });

  it('should retrurn true if the user is logged in and he is allowed for a function', () => {
    service.canNavigate('').then((resolve) => {
      expect(resolve).toBeTruthy();
    });
  });

});
