import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageConversionService {

  LanguageChanged = new EventEmitter<string>();

  // http://stackoverflow.com/questions/35723849/angular-2-create-dictionary-using-typescript-key-value-and-load-json-file-t
  constructor(private http: HttpClient) { }

  GetLocaleResource(locale: string): Promise<any> {

    if (locale === 'en-AU') {
      return this.http.get<any>('./assets/i18n/en-au.json').toPromise();
    } else {
      return this.http.get<any>('./assets/i18n/en-au.json').toPromise();
    }
  }

  EmitLanguageChange(locale: string): void {
    this.LanguageChanged.emit(locale);
  }
}
