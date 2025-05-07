import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppHttpInterceptor } from './http-interceptor.service';

describe('Core: HttpInterceptorService', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let someResponse: any;
  let errResponse: any;

  beforeEach(() => {
      TestBed.configureTestingModule({
    imports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
      httpMock = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
  });


  it('should contain the header value \'Content-Type\' when making a server call', () => {
      httpClient.get('/data').subscribe(
          response => {
              expect(response).toBeTruthy();
          }
      );
      const req = httpMock.expectOne(reqest => reqest.headers.has('Content-Type'));
      expect(req.request.method).toEqual('GET');
      req.flush({ hello: 'world' });
  });

  it('should capture the error if unable to reach the server or any network issues', () => {
      httpClient.get('/error').subscribe((response: any) => { }, (errorResponse) => {
          errResponse = errorResponse;
      });
      httpMock.expectOne('/error').error(new ErrorEvent('Unknown Error'));
      expect(errResponse.statusText).toBe('Unknown Error');
  });


  it('should capture the error(s) thrown by the application\'s backend services', () => {
      // Refer https://stackoverflow.com/questions/46028804/how-to-mock-angular-4-3-httpclient-an-error-response-in-testing
      const mockErrorResponse = {
          status: 404, statusText: 'Bad Request'
      };
      const data = 'Invalid request parameters';
      httpClient.get('/error').subscribe(res => someResponse = res, err => errResponse = err);
      httpMock.expectOne('/error').flush(data, mockErrorResponse);
      expect(errResponse.error).toBe(data);
  });


  afterEach(() => {
      httpMock.verify();
  });
});
