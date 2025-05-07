import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BaseHttp } from '../base-http';
import { AuthorizationService } from './authorization.service';
import { LanguageConversionService } from './language-conversion.service';
import { LangData } from 'src/app/shared/lang-data';
import '../../shared/utility/extension-method';
import { CommonFunction } from 'src/app/shared/utility/common-function';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class AuthenticationService extends BaseHttp {

  user!: User;

  constructor(
    http: HttpClient,
    private authorizationService: AuthorizationService,
    private languageConversionService: LanguageConversionService) {
    super(http);
  }


  async IsLoggedIn(): Promise<boolean> {
    // #TODO#

    // if (CommonFunction.IsNullOrUndefined(this.user) || this.user.UserLogin.UserID.IsNullOrEmpty()) {
    //   await this.GetUser();
    //   if (CommonFunction.IsNullOrUndefined(this.user)) {
    //     return false;
    //   }

    // }
    return true;
  }

  async GetUser(): Promise<User> {
    let user: User = new User();
    // Todo
    //user = await this.fetchUser();
    await this.getLocalResource();
    return user;
  }

  /*
  fetchUser(): Promise<User> {
    return this.httpGet<User>('Auth').pipe(
      tap((data: User) => {
        this.user = data;
        if (CommonFunction.IsNotNullOrUndefined(this.user)
          && this.user.IsLoginSucess) {
          this.setAppAuthData();
          this.setInventoryLocation();
        }
      })
    ).toPromise();
  }
  */

  private setAppAuthData(): void {
    // this.authorizationService.FunctionList = this.user.FunctionList;
  }


  private async getLocalResource(): Promise<void> {
   /*
    if (this.user !== null
      && this.user.UserLogin !== undefined) {
      const data = await this.languageConversionService.GetLocaleResource(this.user.UserLogin.CultureName);
      LangData.push(data);
    }
*/
  }

}
