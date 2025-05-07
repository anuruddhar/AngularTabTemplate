import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CommonService } from './common.service';
import { SearchProduct } from 'src/app/shared/models/search-product.model';
import { SearchCustomer } from 'src/app/shared/models/search-customer';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Core: CommonService', () => {
  let request: any;
  let httpMock: HttpTestingController;
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [CommonService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should call 'SearchProduct()'`, () => {
    service.SearchProduct(new SearchProduct()).subscribe();
    request = httpMock.expectOne(req => req.url.includes('Product/PagingSearch'));
    request.flush({});
  });

  it(`should call 'SearchCustomer()'`, () => {
    service.SearchCustomer(new SearchCustomer()).subscribe();
    request = httpMock.expectOne(req => req.url.includes('Customer/PagingSearch'));
    request.flush({});
  });

  it(`should call 'GetPickList()'`, () => {
    service.GetPickList().subscribe();
    request = httpMock.expectOne(req => req.url.includes('CylinderTest/TestPickList'));
    request.flush({});
  });

});
