import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CanLoadGuard implements CanLoad {

  constructor(private authenticationService: AuthenticationService, public router: Router) { }

  async canLoad(route: Route): Promise<boolean> {
    return await this.checkCanLoad(route);
  }

  async checkCanLoad(route: Route): Promise<boolean> {
    return true;

    // let val = await this.authenticationService.IsLoggedIn();
    // if (val) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    // return false;
  }

}
