import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class GlobalChangeNotifierService {

  private subject = new Subject<any>();

  changeILCode(ilCode: string) {
      this.subject.next(ilCode);
  }

  clearILCode() {
      this.subject.next('');
  }

  getILCode(): Observable<any> {
      return this.subject.asObservable();
  }
}
