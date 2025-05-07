import { Injectable } from '@angular/core';

import { RouteConstant } from 'src/app/shared/route-constant';
import { UserFunction } from 'src/app/shared/models/user-function.model';
import { Constant } from 'src/app/shared/utility/constant';
import { CommonFunction } from 'src/app/shared/utility/common-function';

@Injectable()
export class AuthorizationService {

  FunctionList!: UserFunction[];

  private urlParts!: string[];
  private route!: string;

  constructor() { }

  isAuthorized(functionCode: string): boolean {
    return true;
    // if (functionCode === 'allow') {
    //   return true;
    // }

    // if (functionCode.IsNullOrEmpty()) {
    //   return false;
    // }
    // return this.isPermissionGranted(functionCode);
  }

  isAuthorizedByRoute(url: string): boolean {
    return this.isAuthorized(this.getFunctionCodeByUrl(url));
  }

  private isPermissionGranted(functionCode: string): boolean {
    if (CommonFunction.IsNullOrUndefined(this.FunctionList)) {
      return false;
    }

    for (const appfuncion of this.FunctionList) {
      if (appfuncion.FunctionCode === functionCode) {
        return true;
      }
    }
    return false;
  }

  private getFunctionCodeByUrl(url: string): string {
    if (url === '/mdi/un-authorized'
      || url === '/mdi/sample/controls'
      || url === '/mdi/dummy') {
      return 'allow';
    }

    this.urlParts = url.split('/');
    this.route = this.urlParts[2] + '/' + this.urlParts[3];

    switch (this.route) {
      case RouteConstant.ACC_INFO:
        return Constant.FunctionCode.FC_MNU_DASHBOARD;

      default:
        return '';
    }
  }
}
