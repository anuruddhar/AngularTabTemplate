import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { BaseHttp } from '../base-http';
import { AppException } from 'src/app/shared/models/common/app-exception';
import { DropDown } from 'src/app/shared/models/drop-down.model';

@Injectable()
export class CommonService extends BaseHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    GetUserList(countryId: number): Observable<Array<DropDown> | AppException> {
        return this.httpGet<Array<DropDown>>(`Common/${countryId}/UserList`);
    }

}
