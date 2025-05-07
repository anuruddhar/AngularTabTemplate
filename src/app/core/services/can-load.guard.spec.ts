import { TestBed, async, inject } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanLoadGuard } from './can-load.guard';
import { AuthenticationService } from './authentication.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


xdescribe('Core: CanLoadGuard', () => {
  let service: CanLoadGuard;
  let mockAuthenticationService;
  let mockRoute;

  beforeEach (() => {
    mockAuthenticationService = jasmine.createSpyObj(['IsLoggedIn', 'GetUser']);
    mockRoute = jasmine.createSpy();
    TestBed.configureTestingModule( {
    imports: [RouterTestingModule],
    providers: [
        CanLoadGuard,
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(CanLoadGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrurn false if the user is not logged in', () => {
    const navigateSpy = spyOn(service.router, 'navigate');
    mockAuthenticationService.IsLoggedIn.and.returnValue(false);
    service.canLoad(mockRoute).then((resolve) => {
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
      expect(resolve).toBeFalsy();
    });
  });

  it('should retrurn true if the user already logged in', () => {
    mockAuthenticationService.IsLoggedIn.and.returnValue(true);
    service.canLoad(mockRoute).then((resolve) => {
      expect(resolve).toBeTruthy();
    });
  });
});
