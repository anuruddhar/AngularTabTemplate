import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthorizationService } from './authorization.service';
import { LanguageConversionService } from './language-conversion.service';
import { User } from 'src/app/shared/models/user.model';
import { UserData } from '../unit-test-data/user.data';
import { GlobalVariable } from 'src/app/shared/globals';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe('Core: AuthenticationService', () => {
  let request: any;
  let httpMock: HttpTestingController;
  let mockLanguageConversionService;
  let service: AuthenticationService;
  let mockMasterDataService;

  beforeEach(() => {
    mockLanguageConversionService = jasmine.createSpyObj(['GetLocaleResource']);
    mockMasterDataService  = jasmine.createSpyObj(['fillRequireDefaultData']);
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        AuthenticationService,
        AuthorizationService,
        { provide: LanguageConversionService, useValue: mockLanguageConversionService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationService);
    service.user = new User();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should call the 'GetUser()'`, () => {
    service.GetUser();
    request = httpMock.expectOne(req => req.url.includes('Auth'));
    request.flush(UserData);
  });

  describe('IsLoggedIn() : Return false / true', () => {
    it(`should return false, if the user object is empty`, () => {
      service.user = new User();
      service.IsLoggedIn().then((res) => {
        expect(res).toBeFalsy();
      });
      request = httpMock.expectOne(req => req.url.includes('Auth'));
      request.flush(null);
    });

    it(`should return false, if the user object is null after getuser() is called`, () => {
      let user: User;
      user = new User();
      service.user = new User();
      service.IsLoggedIn().then((res) => expect(res).toBeFalsy());
      request = httpMock.expectOne(req => req.url.includes('Auth'));
      request.flush(user);
    });

    it(`should return false, if the user object is not null but no inventorylocation after getuser() is called`, () => {
      let user: User;
      user = new User();
      service.user = new User();
      service.IsLoggedIn().then((res) => {
        expect(res).toBeFalsy();
      });
      request = httpMock.expectOne(req => req.url.includes('Auth'));
      request.flush(user);
    });

    it(`should return true', if the user object is not empty and userid is not empty`, () => {
      service.user = new User();
      service.IsLoggedIn();
      service.IsLoggedIn().then((res) => expect(res).toBeTruthy());
    });
  });

  describe('GetUser() : Fill necessary values', () => {

    it(`should fill the 'user'`, () => {
      service.GetUser().then((resol) => {
        expect(resol).toEqual(service.user);
      });
      request = httpMock.expectOne(req => req.url.includes('Auth'));
      request.flush(UserData);
    });

    it(`should fill the 'GlobalVariables'`, () => {
      const authorizationService = TestBed.inject(AuthorizationService);
      service.GetUser().then((resol) => {
        expect(GlobalVariable.UserID).toEqual('ANURUDDHA.RAJAPAKSHA');
        expect(authorizationService.FunctionList.length).toBe(2);
      });
      request = httpMock.expectOne(req => req.url.includes('Auth'));
      request.flush(UserData);
    });

    it(`should fill the 'Function list'`, () => {
      const authorizationService = TestBed.inject(AuthorizationService);
      service.GetUser().then((resol) => {
        expect(authorizationService.FunctionList.length).toBe(2);
      });
      request = httpMock.expectOne(req => req.url.includes('Auth'));
      request.flush(UserData);
    });

    it(`should set the first inventory location if the default inventory location is not available'`, () => {
      let user: User;
      user = new User();

      service.GetUser().then((resol) => {

      });
      request = httpMock.expectOne(req => req.url.includes('Auth'));
      request.flush(user);
    });

  });

});

