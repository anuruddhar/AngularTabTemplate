import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SelectItem, MessageService } from 'primeng/api';

import { AuthenticationService } from '../core/services/authentication.service';
import { GlobalVariable } from '../shared/globals';
import { LanguageConversionService } from '../core/services/language-conversion.service';
// import { ngxLoadingAnimationTypes } from 'ngx-loading';
import '../shared/utility/extension-method';
import { LangData } from '../shared/lang-data';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  i18n: any;
  selectedInventoryLocationId: number;
  loginUser: User;
  invetoryLocations: SelectItem[];
  credentialRequired: boolean;
  IsDataLoading = false;

  //public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  //public loadingTemplate: TemplateRef<any>;
  // public config = { animationType: ngxLoadingAnimationTypes.circleSwish, backdropBorderRadius: '3px', backdropBackgroundColour: '#ffffff' };

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router,
    private langService: LanguageConversionService
  ) {
    this.loginUser = new User();
    this.selectedInventoryLocationId = 0;
    this.invetoryLocations = new Array<SelectItem>();
    this.credentialRequired = GlobalVariable.CredentialRequired;
  }

  async ngOnInit() {
    try {
      this.IsDataLoading = true;

      await this.checkAuthentication();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login',
        detail: 'Unable to reach the server! Please try later.',
      });
    }
  }

  async checkAuthentication(): Promise<void> {
    // if (await this.authenticationService.IsLoggedIn()) {
    //   this.loginUser = this.authenticationService.user;
    //   if (!this.loginUser.IsLoginSucess) {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Login',
    //       detail: this.loginUser.Message,
    //     });
    //   } else {
    //     this.checkInventoryLocation();
    //     this.IsDataLoading = false;
    //   }

    //   if (LangData.length === 0) {
    //     if (this.loginUser !== null && this.loginUser.UserLogin !== undefined) {
    //       const data = await this.langService.GetLocaleResource(
    //         this.loginUser.UserLogin.DefaultCultureID
    //       );
    //       LangData.push(data);
    //     }
    //   }
    //   this.i18n = LangData[0];
    // }
    if (LangData.length === 0) {
      if (this.loginUser !== null && this.loginUser.UserLogin !== undefined) {
        const data = await this.langService.GetLocaleResource(
          this.loginUser.UserLogin.DefaultCultureID
        );
        LangData.push(data);
      }
    }
    this.i18n = LangData[0];
  }

  checkInventoryLocation(): void {
    // if (this.loginUser.UserLogin.UserID !== '') {
    //   if (this.loginUser.InventoryLocationList.IsNotNullOrEmpty()) {
    //     this.selectedInventoryLocationId = this.loginUser.DefaultInventoryLocation.InventoryLocationId;
    //     if (this.loginUser.InventoryLocationList.length === 1) {
    //       this.routeToMainPage();
    //     } else {
    //       this.createInventoryLocationList();
    //     }
    //   }
    // }
    if (this.loginUser.UserLogin.UserID !== '') {
      this.routeToMainPage();
    }
  }

  createInventoryLocationList(): void {
    // if (this.loginUser.InventoryLocationList.IsNotNullOrEmpty()) {
    //   this.loginUser.InventoryLocationList.forEach(ilLocation => {
    //     this.invetoryLocations.push({ label: ilLocation.InventoryDisplayName, value: ilLocation.InventoryLocationId });
    //   });
    // }
  }

  setSelectedInventoryLocation(): void {
    // if (this.loginUser != null && this.loginUser.InventoryLocationList.IsNotNullOrEmpty()) {
    //   if (this.selectedInventoryLocationId === 0) {
    //     this.loginUser.DefaultInventoryLocation = this.loginUser.InventoryLocationList[0];
    //   } else {
    //     const selectedInventoryLocation = this.loginUser.InventoryLocationList.filter((element, index, array) => {
    //       return (element.InventoryLocationId === +this.selectedInventoryLocationId);
    //     });
    //     if (selectedInventoryLocation.IsNotNullOrEmpty()) {
    //       this.loginUser.DefaultInventoryLocation = selectedInventoryLocation[0];
    //       GlobalVariable.InventoryLocation = this.loginUser.DefaultInventoryLocation;
    //     } else {
    //       this.loginUser.DefaultInventoryLocation = this.loginUser.InventoryLocationList[0];
    //       GlobalVariable.InventoryLocation = this.loginUser.DefaultInventoryLocation;
    //     }
    //   }
    // }
  }

  login(): void {
    // if (this.loginUser.UserLogin.UserID.IsNullOrEmpty()) {
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Login',
    //     detail: 'Please provide user Id!',
    //   });
    // } else if (this.selectedInventoryLocationId === 0) {
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Login',
    //     detail: 'Inventory location is not selected!',
    //   });
    // } else {
    //   this.routeToMainPage();
    // }
    this.routeToMainPage();
  }

  routeToMainPage(): void {
    this.setSelectedInventoryLocation();
    // this.loginService.IsLoggedIn = true;
    this.router.navigate(['/mdi']);
  }
}
