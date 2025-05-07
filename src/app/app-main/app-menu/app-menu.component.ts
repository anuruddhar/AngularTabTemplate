import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { MdiComponent } from '../mdi/mdi.component';
import { AuthorizationService } from '../../core/services/authorization.service';
import { RouteConstant } from '../../shared/route-constant';
import { ScrollPanelComponent } from '../../shared/components/scroll-panel/scroll-panel.component';
import { Constant } from 'src/app/shared/utility/constant';
import '../../shared/utility/extension-method';
import { LangData } from 'src/app/shared/lang-data';
import { LanguageConversionService } from 'src/app/core/services/language-conversion.service';
import { GlobalVariable } from 'src/app/shared/globals';
import { MenuItem } from '../models/app-menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  animations: [
    trigger('children', [
      state(
        'hiddenAnimated',
        style({
          height: '0px',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
          'z-index': 100,
        })
      ),
      state(
        'hidden',
        style({
          height: '0px',
          'z-index': '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit, AfterViewInit {
  @Input() reset: boolean = true;
  @ViewChild('layoutMenuScroller')
  layoutMenuScrollerViewChild!: ScrollPanelComponent;
  model: MenuItem[] = [];
  private subMenuitems: MenuItem[] = [];
  i18n: any;
  ParentActive!: boolean;
  Reset!: boolean;
  activeIndex: number | undefined;

  constructor(
    public app: MdiComponent,
    private authService: AuthorizationService,
    private languageConversionService: LanguageConversionService,
    private _ngZone: NgZone
  ) {
    this.model = [];
    this.i18n = LangData[0];
    this.subscribeLanguageChangeEvent();
  }

  ngOnInit() {
    this.addMenus();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.layoutMenuScrollerViewChild.moveBar();
    }, 100);
  }

  private subscribeLanguageChangeEvent(): void {
    this.languageConversionService.LanguageChanged.subscribe(
      (locale: string) => {
        this._ngZone.run(() => {
          this.i18n = LangData[0];
          this.addMenus();
        });
      }
    );
  }

  private addMenus(): void {
    this.model = [];
    this.addDashboardMenus();
    // this.addInitializationMenus();
    this.addClientMenus();
    this.addCreditMenus();
    this.addAdministrationMenus();
    this.addLayoutAndMenuColorSetting();
    this.addThemeSetting();
    this.addSampleForm();
  }

  // #Todo
  isAuthorized(functionCode: any): boolean {
    return this.authService.isAuthorized(functionCode);
  }
  getSubMenuItem(
    labelVal: string,
    iconVal: string,
    routerLinkVal: Array<any>
  ): any {
    return { label: labelVal, icon: iconVal, routerLink: routerLinkVal };
  }
  /*
  if (this.isAuthorized(Constant.FunctionCode.FC_MNU_DB_CYLINDER_SHORTAGE_VIEW)) {
      this.subMenuitems.push(this.getSubMenuItem('Cylinder Shortage', 'fa fa-fw icon-cyl-shortage',[RouteConstant.CYLINDER_SHORTAGE]));
  }
  */

  addDashboardMenus(): void {
    this.subMenuitems = [];
    if (
      this.authService.isAuthorized(Constant.FunctionCode.FC_MNU_DASHBOARD)
    ) {
      let subitem = new MenuItem(
        this.i18n.mnuAccInfo,
        'fa fa-fw fa-user-circle-o',
        [RouteConstant.ACC_INFO],
        [],
        undefined
      );


      this.subMenuitems.push(subitem);
    }

    if (this.subMenuitems.IsNotNullOrEmpty()) {
      let item = new MenuItem(
        this.i18n.mnuDashboard,
        'fa fa-fw fa-tachometer',
        undefined,
        this.subMenuitems,
        undefined
      );

      this.model.push(item);
    }
  }

  addInitializationMenus(): void {
    this.subMenuitems = [];

    if (
      this.authService.isAuthorized(
        Constant.FunctionCode.FC_MNU_ITEM_SUPERVISION
      )
    ) {
      let subitem = new MenuItem(
        this.i18n.mnuHomeItemSupervision,
        'fa fa-fw icon-item-supervision-1',
        [RouteConstant.ITEM_SUPERVISION],
        [],
        undefined
      );
      this.subMenuitems.push(subitem);
    }

    // if (
    //   this.authService.isAuthorized(
    //     Constant.FunctionCode.FC_MNU_STANDARD_INITIALIZATION
    //   )
    // ) {
    //   this.subMenuitems.push({
    //     label: this.i18n.mnuStandardInitialization,
    //     icon: 'fa fa-fw icon-standared-initialization',
    //     routerLink: [RouteConstant.STD_INITIALIZATION],
    //   });
    // }

    // if (
    //   this.authService.isAuthorized(
    //     Constant.FunctionCode.FC_MNU_LIGHT_INITIALIZATION
    //   )
    // ) {
    //   this.subMenuitems.push({
    //     label: this.i18n.mnuLightInitialization,
    //     icon: 'fa fa-fw icon-lite-initialization',
    //     routerLink: [RouteConstant.LITE_INITIALIZATION],
    //   });
    // }

    if (this.subMenuitems.IsNotNullOrEmpty()) {
      let item = new MenuItem(
        this.i18n.mnuInitialization,
        'fa fa-fw icon-initialization',
        undefined,
        this.subMenuitems,
        undefined
      );
      this.model.push(item);
    }
  }

  addClientMenus(): void {
    this.subMenuitems = [];

    if (
      this.authService.isAuthorized(
        Constant.FunctionCode.FC_MNU_ITEM_SUPERVISION
      )
    ) {
      let subItemClientSupervision = new MenuItem(
        this.i18n.mnuClientSupervision,
        'fa fa-fw fa-users',
        [RouteConstant.CLIENT_SUPERVISION],
        [],
        (event: any) => alert('Client Supervision')
      );
      this.subMenuitems.push(subItemClientSupervision);

      let subItemAddClient = new MenuItem(
        this.i18n.mnuCreateClient,
        'fa fa-fw fa-user-o',
        [RouteConstant.CLIENT_CREATE],
        [],
        undefined
      );
      this.subMenuitems.push(subItemAddClient);
    }

    if (this.subMenuitems.IsNotNullOrEmpty()) {
      let item = new MenuItem(
        this.i18n.mnuClient,
        'fa fa-fw fa-user-o',
        undefined,
        this.subMenuitems,
        undefined
      );

      this.model.push(item);
    }
  }

  addCreditMenus(): void {
    this.subMenuitems = [];

    if (
      this.authService.isAuthorized(
        Constant.FunctionCode.FC_MNU_ITEM_SUPERVISION
      )
    ) {
      let subItemClientSupervision = new MenuItem(
        this.i18n.mnuCreditSupervision,
        'fa fa-fw fa-credit-card-alt',
        [RouteConstant.CREDIT_SUPERVISION],
        [],
        undefined
      );
      this.subMenuitems.push(subItemClientSupervision);

      let subItemAddClient = new MenuItem(
        this.i18n.mnuCreditIntegration,
        'fa fa-fw fa-credit-card',
        [RouteConstant.CREDIT_INTEGRATION],
        [],
        undefined
      );
      this.subMenuitems.push(subItemAddClient);
    }

    if (this.subMenuitems.IsNotNullOrEmpty()) {
      let item = new MenuItem(
        this.i18n.mnuCredit,
        'fa fa-fw fa-credit-card-alt',
        undefined,
        this.subMenuitems,
        undefined
      );

      this.model.push(item);
    }
  }

  addAdministrationMenus(): void {
    this.subMenuitems = [];

    if (
      this.authService.isAuthorized(
        Constant.FunctionCode.FC_MNU_ITEM_SUPERVISION
      )
    ) {
      let subitem = new MenuItem(
        this.i18n.mnuHomeItemSupervision,
        'fa fa-fw icon-item-supervision-1',
        [RouteConstant.ITEM_SUPERVISION],
        [],
        undefined
      );
      this.subMenuitems.push(subitem);
    }

    if (this.subMenuitems.IsNotNullOrEmpty()) {
      let item = new MenuItem(
        this.i18n.mnuAdministration,
        'fa fa-fw icon-initialization',
        undefined,
        this.subMenuitems,
        undefined
      );
      this.model.push(item);
    }
  }

  addLayoutAndMenuColorSetting(): void {
    this.model.push(
      new MenuItem(
        'Layouts',
        'fa fa-fw fa-cog',
        //badge: '5',
        undefined,
        [
          new MenuItem(
            'Slim',
            'fa fa-fw fa-bars',
            undefined,
            [],
            (event: any) => (this.app.menuMode = 'slim')
          ),
          new MenuItem(
            'Static',
            'fa fa-fw fa-bars',
            undefined,
            [],
            (event: any) => (this.app.menuMode = 'static')
          ),
          new MenuItem(
            'Overlay',
            'fa fa-fw fa-bars',
            undefined,
            [],
            (event: any) => (this.app.menuMode = 'overlay')
          ),
          new MenuItem(
            'Horizontal',
            'fa fa-fw fa-bars',
            undefined,
            [],
            (event: any) => (this.app.menuMode = 'horizontal')
          ),
          new MenuItem(
            'Toggle',
            'fa fa-fw fa-bars',
            undefined,
            [],
            (event: any) => (this.app.menuMode = 'toggle')
          ),
        ],
        undefined
      )
    );
  }

  addSampleForm(): void {
    this.model.push( new MenuItem (
      'Sample Form',
      'fa fa-fw fa-wpforms',
       ['sample/controls'],
       [],
       undefined
    ));
  }

  addThemeSetting(): void {
    this.model.push(
      new MenuItem(
        'Themes',
        'fa fa-fw fa-paint-brush',
        //badge: '16',
        undefined,
        [
          new MenuItem(
            'Teal - Yellow',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('teal-yellow', null)
          ),
          new MenuItem(
            'Blue - Orange',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('blue-orange', null)
          ),
          new MenuItem(
            'Pink - Teal',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('pink-teal', null)
          ),
          new MenuItem(
            'Indigo - Purple',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('indigo-purple', null)
          ),
          new MenuItem(
            'Indigo - Yellow',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('indigo-yellow', null)
          ),
          new MenuItem(
            'Cyan - Deep Orange',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('cyan-deeporange', null)
          ),
          new MenuItem(
            'Green - Pink',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('green-pink', null)
          ),
          new MenuItem(
            'Green - Orange',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('green-orange', null)
          ),
          new MenuItem(
            'Green - Purple',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('green-purple', null)
          ),
          new MenuItem(
            'Orange - Cyan',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('orange-cyan', null)
          ),
          new MenuItem(
            'Blue - Grey',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('blue-grey', null)
          ),
          new MenuItem(
            'Deep Purple - Teal',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('deeppurple-teal', null)
          ),
          new MenuItem(
            'Pink - Cyan',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('pink-cyan', null)
          ),
          new MenuItem(
            'Orange - Indigo',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('orange-indigo', null)
          ),
          new MenuItem(
            'Dark Pink - Cyan',
            'fa fa-fw fa-paint-brush',
            undefined,
            [],
            (event: any) => this.changeTheme('darkpink-cyan', null)
          ),
        ],
        undefined
      )
    );
  }

  changeTheme(theme: string, mode: string | null) {
    const layoutLink: HTMLLinkElement = document.getElementById(
      'layout-css'
    ) as HTMLLinkElement;
    layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';

    const themeLink: HTMLLinkElement = document.getElementById(
      'theme-css'
    ) as HTMLLinkElement;
    themeLink.href =
      'assets/theme/theme-' + (mode ? theme + '-' + mode : theme) + '.css';

    // setThemeLocalStorage
    localStorage.setItem(
      `LAYOUT_LINK_${GlobalVariable.UserID}_${GlobalVariable.ReleseType}`,
      layoutLink.href
    );
    localStorage.setItem(
      `THEME_LINK_${GlobalVariable.UserID}_${GlobalVariable.ReleseType}`,
      themeLink.href
    );
  }

  onMenuClick(event: any) {
    if (!this.app.isHorizontal()) {
      setTimeout(() => {
        this.layoutMenuScrollerViewChild.moveBar();
      }, 450);
    }

    this.app.onMenuClick(event);
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  onMouseEnter(index: number) {
    if (
      this.app.menuHoverActive &&
      this.app.isHorizontal() &&
      !this.app.isMobile() &&
      !this.app.isTablet()
    ) {
      this.activeIndex = index;
    }
  }

  itemClick(event: Event, mnuItem: MenuItem, index: number): boolean {
    // avoid processing disabled items
    if (mnuItem.disabled) {
      event.preventDefault();
      return true;
    }

    // activate current item and deactivate active sibling if any
    this.activeIndex = this.activeIndex === index ? undefined : index;

    // execute command
    if (mnuItem.command) {
      mnuItem.command({ originalEvent: event, item: mnuItem });
    }

    // prevent hash change
    if (mnuItem.items || (!mnuItem.url && !mnuItem.routerLink)) {
      setTimeout(() => {
        this.layoutMenuScrollerViewChild.moveBar();
      }, 450);
      event.preventDefault();
    }

    // hide menu
    if (!mnuItem.items) {
      if (this.app.isHorizontal()) {
        this.app.resetMenu = true;
      } else {
        this.app.resetMenu = false;
      }

      this.app.overlayMenuActive = false;
      this.app.staticMenuMobileActive = false;
      this.app.menuHoverActive = !this.app.menuHoverActive;
    }

    return true;
  }
}
