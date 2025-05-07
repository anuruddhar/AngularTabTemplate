import { Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RouteManagerService } from './route-manager.service';
import { AuthenticationService } from './authentication.service';
import { GlobalVariable } from 'src/app/shared/globals';

@Injectable()
export class CanActivateChildGuard implements CanActivateChild {

  constructor(public router: Router,
    private authenticationService: AuthenticationService,
    private routeManagerService: RouteManagerService) { }

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return await this.canNavigate(state.url);
  }

  async canNavigate(url: string): Promise<boolean> {
    return await this.isCanNavigate(url);
  }

  async isCanNavigate(url: string): Promise<boolean> {
    if (await this.authenticationService.IsLoggedIn()) {
      if (this.routeManagerService.checkAndNavigate(url)) {
        return true;
      }
      this.router.navigate(['/mdi/un-authorized']);
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }

}
