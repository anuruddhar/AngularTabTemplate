import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Extentions } from '../shared/utility/extentions';
// import '../shared/utility/extension-method';
import { GlobalVariable } from '../shared/globals';
import { AppException } from '../shared/models/common/app-exception';
import { catchError } from 'rxjs/operators';
import { CommonFunction } from '../shared/utility/common-function';

export class Param {
    public ey!: string;
    public value!: string;
}

export class BaseHttp {
    params!: HttpParams;
    httpOptions: any;

    constructor(protected http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    GetParams(searchObj: any): HttpParams {
        this.params = new HttpParams();
        Object.keys(searchObj).forEach((key) => {
            if (key === 'FromDate'
                || key === 'ToDate'
                || key === 'SearchDateTime'
                || key === 'StartDate'
                || key === 'EndDate'
                // || key === 'ReceivedDateFrom'
                // || key === 'ReceivedDateTo'
                || key === 'DeletedDateTime'
                || key === 'ReceivedDate'
                || key === 'ManufacturingDate') {
                this.params = this.params.append(key, Extentions.ToValidDateTime(searchObj[key]));
            } else {
                this.params = this.params.append(key, searchObj[key]);
            }
        });
        return this.params;
    }

    httpGet<T>(methodName: string, httpParams?: any): Observable<T | AppException> {
        if (httpParams) {
            this.params = this.GetParams(httpParams);
            return this.http.get<T>(this.getUrl(methodName), { params: this.params })
                .pipe(
                    catchError(err => this.handleHttpError(err))
                );
        } else {
            return this.http.get<T>(this.getUrl(methodName))
                .pipe(
                    catchError(err => this.handleHttpError(err))
                );
        }
    }

    httpPost<T>(methodName: string, object: any): Observable<T | AppException> {
        return this.http.post<T>(this.getUrl(methodName), object)
            .pipe(
                catchError(err => this.handleHttpError(err))
            );
    }

    httpPut<T>(methodName: string, object: any): Observable<T | AppException> {
        return this.http.put<T>(this.getUrl(methodName), object)
            .pipe(
                catchError(err => this.handleHttpError(err))
            );
    }

    httpPatch<T>(methodName: string, object: any): Observable<T | AppException> {
        return this.http.patch<T>(this.getUrl(methodName), object)
            .pipe(
                catchError(err => this.handleHttpError(err))
            );
    }

    httpDelete<T>(methodName: string, httpParams?: any): Observable<T | AppException> {
        if (httpParams) {
            this.params = this.GetParams(httpParams);
            return this.http.delete<T>(this.getUrl(methodName), { params: this.params })
                .pipe(
                    catchError(err => this.handleHttpError(err))
                );
        } else {
            return this.http.delete<T>(this.getUrl(methodName))
                .pipe(
                    catchError(err => this.handleHttpError(err))
                );
        }
    }

    private handleHttpError(error: HttpErrorResponse): Observable<AppException> {
        let appException: AppException;
        appException = new AppException();
        appException.ErrorCode = error.status;
        appException.Message = error.statusText;
        return throwError(appException);
    }

    protected getUrl(url: string): string {
        const firstpart = url.split('/')[0];
        if (GlobalVariable.UseMock) {
            switch (firstpart) {
                case 'Auth':
                    return GlobalVariable.MockApibase + '' + 'assets/api/auth-data.json';
                case 'TestTemplate':

                default:
                    return GlobalVariable.Apibase + url;
            }
        } else {
            return GlobalVariable.Apibase + url;
        }
    }
}
