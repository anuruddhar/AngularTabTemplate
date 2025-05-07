import { Component, OnInit, HostListener } from '@angular/core';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import '../../shared/utility/extentions';
import { LangData } from 'src/app/shared/lang-data';
import { User } from 'src/app/shared/models/user.model';
import { LanguageConversionService } from 'src/app/core/services/language-conversion.service';

@Component({
  selector: 'app-mdi',
  templateUrl: './mdi.component.html',
  styleUrls: ['./mdi.component.css']
})
export class MdiComponent implements OnInit {

  i18n: any;
  isLoading = false;
  menuMode = 'slim';
  topbarMenuActive!: boolean;
  overlayMenuActive!: boolean;
  slimMenuActive!: boolean;
  slimMenuAnchor!: boolean;
  toggleMenuActive!: boolean;
  staticMenuDesktopInactive!: boolean;
  staticMenuMobileActive!: boolean;

  layoutMenuScroller!: HTMLDivElement;
  lightMenu = false;
  menuClick!: boolean;
  topbarItemClick!: boolean;
  activeTopbarItem: any;
  resetMenu!: boolean;
  menuHoverActive!: boolean;
  rightPanelActive!: boolean;
  rightPanelClick!: boolean;

  constructor(private router: Router,
              public routeManagerService: RouteManagerService,
              private confirmationService: ConfirmationService,
              private langService: LanguageConversionService) {

    this.i18n = LangData[0];
    this.router.events.subscribe((eve) => {
      switch (true) {
        case eve instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case eve instanceof NavigationEnd:
        case eve instanceof NavigationCancel:
        case eve instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  async ngOnInit() {
    await this.getLocaleResource();
  }

  async getLocaleResource(): Promise<void> {
    if (LangData.length === 0) {
      const data = await this.langService.GetLocaleResource(
        'en-AU'
      );
      LangData.push(data);
    }
    this.i18n = LangData[0];
  }

  isDisplayTabBar(): boolean {
    if (this.routeManagerService.tabs.IsNotNullOrEmpty()) {
      return true;
    } else {
      return false;
    }
  }

  getTabs() {
    return this.routeManagerService.tabs;
  }

  selectTab(tabId: string): void {
    if (!this.routeManagerService.isActive(tabId)) {
      this.routeManagerService.navigateToComponent(tabId);
    }
  }

  isActive(tabid: string): boolean {
    return this.routeManagerService.isActive(tabid);
  }

  addTab(): void {
    this.routeManagerService.addTab();
  }

  deleteTab(tabId: string): void {
    if (this.routeManagerService.selectedTab.isDirty) {
      this.confirmationService.confirm({
        message: 'You have unsaved changes. Are you sure you want to leave this page?',
        accept: () => {
          this.routeManagerService.deleteTab(tabId, '');
        }
      });
    } else {
      this.routeManagerService.deleteTab(tabId, '');
    }
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.rightPanelClick) {
      this.rightPanelActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal()) {
        this.resetMenu = true;
      }

      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }

      if (this.slimMenuActive) {
        this.hideSlimMenu();
      }

      if (this.toggleMenuActive) {
        this.hideToggleMenu();
      }

      this.menuHoverActive = false;
    }

    this.topbarItemClick = false;
    this.menuClick = false;
    this.rightPanelClick = false;
  }

  onMenuButtonClick(event: any) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isOverlay()) {
      this.overlayMenuActive = !this.overlayMenuActive;
    }
    if (this.isToggle()) {
      this.toggleMenuActive = !this.toggleMenuActive;
    }
    if (this.isDesktop()) {
      this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
    } else {
      this.staticMenuMobileActive = !this.staticMenuMobileActive;
    }

    event.preventDefault();
  }

  onMenuClick($event: any) {
    this.menuClick = true;
    this.resetMenu = false;
  }

  onAnchorClick(event: any) {
    if (this.isSlim()) {
      this.slimMenuAnchor = !this.slimMenuAnchor;
    }
    event.preventDefault();
  }

  onMenuMouseEnter(event: any) {
    if (this.isSlim()) {
      this.slimMenuActive = true;
    }
  }

  onMenuMouseLeave(event: any) {
    if (this.isSlim()) {
      this.slimMenuActive = false;
    }
  }

  onTopbarMenuButtonClick(event: any) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onTopbarItemClick(event: any, item: any) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSubItemClick(event: any) {
    event.preventDefault();
  }

  onRightPanelButtonClick(event: any) {
    this.rightPanelClick = true;
    this.rightPanelActive = !this.rightPanelActive;
    event.preventDefault();
  }

  onRightPanelClick() {
    this.rightPanelClick = true;
  }

  isHorizontal() {
    return this.menuMode === 'horizontal';
  }

  isSlim() {
    return this.menuMode === 'slim';
  }

  isOverlay() {
    return this.menuMode === 'overlay';
  }

  isToggle() {
    return this.menuMode === 'toggle';
  }

  isStatic() {
    return this.menuMode === 'static';
  }

  isMobile() {
    return window.innerWidth < 1281;
  }

  isDesktop() {
    return window.innerWidth > 1280;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1280 && width > 640;
  }

  hideOverlayMenu() {
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  hideSlimMenu() {
    this.slimMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  hideToggleMenu() {
    this.toggleMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  checkBeforeClosing($event: any) {
    return $event.returnValue = 'Your changes will not be saved';
  }

}
