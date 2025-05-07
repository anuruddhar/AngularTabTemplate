import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, throwError} from 'rxjs';
import { map, catchError  } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    errMsg = '';

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const token: string = localStorage.getItem('token');

        // if (token) {
        //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        // }
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((response: HttpErrorResponse) => {
                if (response instanceof HttpErrorResponse) {
                    if (response.error instanceof ErrorEvent) {
                        // A client-side or network error occurred. Handle it accordingly.
                        this.errMsg = 'An error occurred: ' + response.error.message;
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        this.errMsg =
                            `Backend returned code ${response.status}, ` +
                            `body was: ${response.error}`;
                    }
                }
                return throwError(response);
            }));
    }
}
