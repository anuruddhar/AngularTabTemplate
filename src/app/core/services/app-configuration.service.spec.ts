import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppConfigurationService } from './app-configuration.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

let request: any;
let httpMock: HttpTestingController;
let service: AppConfigurationService;

describe('AppConfigurationService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call configuration from the asset folder', () => {
    service.loadConfigurations();
    request = httpMock.expectOne(req => req.url.includes('assets/app-configuration.json'));
  });

});
