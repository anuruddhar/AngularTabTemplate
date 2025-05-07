import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { LanguageConversionService } from './language-conversion.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Core: LanguageConversionService', () => {
  let languageFileRequest: any;
  let httpMock: HttpTestingController;
  let langService: LanguageConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [LanguageConversionService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    httpMock = TestBed.inject(HttpTestingController);
    langService = TestBed.inject(LanguageConversionService);
  });

  it('should be created', () => {
    expect(langService).toBeTruthy();
  });

  it('should load the  \'en-AU\' file even if the key does not exist', (done) => {
    langService.GetLocaleResource('')
      .then((res: any) => {
        expect(res).toEqual(
          [
            { actCreateInventory: 'Inventory Creation' },
            { actCreateInventory1: 'Inventory Creation' }
          ]);
        done();
      });

    languageFileRequest = httpMock.expectOne('./assets/i18n/en-au.json');
    languageFileRequest.flush([{ actCreateInventory: 'Inventory Creation' },
    { actCreateInventory1: 'Inventory Creation' }]);
  });

  it('should load the \'en-AU\' file successfully', (done) => {
    langService.GetLocaleResource('en-AU')
      .then((res: any) => {
        expect(res).toEqual(
          [
            { actCreateInventory: 'Inventory Creation' },
            { actCreateInventory1: 'Inventory Creation' }
          ]);
        done();
      });

    languageFileRequest = httpMock.expectOne('./assets/i18n/en-au.json');
    languageFileRequest.flush([{ actCreateInventory: 'Inventory Creation' },
    { actCreateInventory1: 'Inventory Creation' }]);
  });

  it('should load the \'zh-SG\' file successfully', (done) => {
    langService.GetLocaleResource('zh-SG')
      .then((res: any) => {
        expect(res).toEqual(
          [
            { actCreateInventory: 'Inventory Creation' },
            { actCreateInventory1: 'Inventory Creation' }
          ]);
        done();
      });

    languageFileRequest = httpMock.expectOne('./assets/i18n/zh-sg.json');
    languageFileRequest.flush([{ actCreateInventory: 'Inventory Creation' },
    { actCreateInventory1: 'Inventory Creation' }]);
  });

  it('should load the \'zh-TW\' file successfully', (done) => {
    langService.GetLocaleResource('zh-TW')
      .then((res: any) => {
        expect(res).toEqual(
          [
            { actCreateInventory: 'Inventory Creation' },
            { actCreateInventory1: 'Inventory Creation' }
          ]);
        done();
      });

    languageFileRequest = httpMock.expectOne('./assets/i18n/zh-tw.json');
    languageFileRequest.flush([{ actCreateInventory: 'Inventory Creation' },
    { actCreateInventory1: 'Inventory Creation' }]);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
