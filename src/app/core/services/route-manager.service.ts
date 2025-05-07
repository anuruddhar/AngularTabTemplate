import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Tab } from 'src/app/shared/models/tab-model';
import { AuthorizationService } from './authorization.service';
import '../../shared/utility/extension-method';
import { CommonFunction } from 'src/app/shared/utility/common-function';

@Injectable()
export class RouteManagerService {
    router: Router;
    selectedTabIndex = 0;
    tabs: Tab[];
    currentUrl: string;
    currentUrlParts: Array<string> = [];
    selectedUrlParts: Array<string> = [];
    selectedTab!: Tab;
    workingTab!: Tab;
    isInitialRoute!: boolean;
    isNavigationFromTab: boolean;
    canAddNewTab = true;
    IsNavigatingToAcual: boolean;
    private nextTabId = 0;
    private tabFormViewModel: any = null;
    private maxId!: number;
    private previousUrl: string;

    constructor(
        router: Router,
        private authService: AuthorizationService) {
        this.tabs = new Array();
        this.currentUrl = '';
        this.isNavigationFromTab = false;
        this.router = router;
        this.previousUrl = '';
        this.IsNavigatingToAcual = false;
    }

    checkAndNavigate(url: string): boolean {
        if (url === '/mdi') {
            this.tabs = new Array<Tab>();
            // Todo
            //this.selectedTab = null;
            return true;
        } else if (this.isActiveByUrl(url)) {
            return false;
        } else if (this.isRouteAlreadyExist(url)) {
            this.selectTabByUrl(url);
            return true;
        } else if (this.isFromAndToComponentSame(url)) {
            this.previousUrl = url;
            this.router.navigate(['/mdi/dummy/']);
            return true;
        } else {
            if (this.authService.isAuthorizedByRoute(url)) {
                this.addTab();
                this.addCurrentUrl(url);
                return true;
            }
            return false;
        }
    }

    addTab(): void {
        if (this.tabs.IsNullOrEmpty()) {
            this.tabs = new Array<Tab>();
        }
        // this.setNextTabId();
        this.tabs.push({
            id: CommonFunction.newGuid(),
            title: 'Loading...',
            url: this.currentUrl,
            tabFormViewModel: this.tabFormViewModel,
            isDirty: true,
            bundle:'',
            bundleArray: []
        });
        this.selectedTabIndex = this.tabs.length - 1;
        this.selectedTab = this.tabs[this.selectedTabIndex];

    }

    selectTab(tabId: string): boolean {
        if (this.tabs != null && this.tabs.length > 0) {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id === tabId) {
                    this.selectedTabIndex = i;
                    this.selectedTab = this.tabs[i];
                    break;
                }
            }
            return true;
        } else {
            this.selectedTabIndex = -1;
            return false;
        }
    }

    deleteTab(tabId: string, urlToNavigate: string): void {
        let index: number;
        if (this.tabs != null && this.tabs.length > 0) {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id === tabId) {
                    index = i;
                    break;
                }
            }
            this.tabs.splice(index!, 1);
            if (this.tabs != null && this.tabs.length > 0) {
                if (index! === this.tabs.length) {
                    index--;
                }
            } else {
                this.selectedTabIndex = -1;
                this.currentUrl = '';
            }
            if (urlToNavigate !== undefined
                && urlToNavigate !== '') {
                this.router.navigate([urlToNavigate]);
            } else if (this.tabs.length === 0) {
                this.router.navigateByUrl('mdi');
                // Todo
                //this.selectedTab = null;
            } else {
                this.navigateToComponent(this.tabs[index!].id);
            }
        }
    }

    deleteDummy(): void {
        if (this.IsNavigatingToAcual === true
            && this.currentUrl !== '/mdi/dummy') {
            this.tabs.splice(this.tabs.length - 2, 1);
            this.IsNavigatingToAcual = false;
        }
    }

    deletePreviousTab(): void {
        setTimeout(() => {
            this.tabs.splice(this.tabs.length - 2, 1);
        }, 100);
    }

    isActive(tabid: string): boolean {
        if (tabid === this.selectedTab.id) {
            return true;
        }
        return false;
    }

    setTitle(tabId: string, title: string): void {
        if (this.tabs != null && this.tabs.length > 0) {
            for (const tab of this.tabs) {
                if (tab.id === tabId) {
                    tab.title = title;
                    break;
                }
            }
        }
    }

    setWorkingTab(tabId: string): void {
        // Todo
        // this.workingTab = null;
        if (this.tabs != null && this.tabs.length > 0) {
            for (const tab of this.tabs) {
                if (tab.id === tabId) {
                    this.workingTab = tab;
                    break;
                }
            }
        }
    }

    navigateToComponent(tabId: string): void {
        let url = '';
        for (const tab of this.tabs) {
            if (tab.id === tabId) {
                url = tab.url;
                break;
            }
        }
        if (url !== '') {
            this.router.navigate([url]);
        }
    }

    routeFromDummyToActual(): void {
        this.IsNavigatingToAcual = true;
        // Todo
        // this.selectedTab = undefined;
        this.router.navigate([this.previousUrl]);
    }

    private isFromAndToComponentSame(url: string): boolean {
        if (this.selectedTab !== undefined
            && this.selectedTab !== null) {
            this.currentUrlParts = url.split('/');
            this.selectedUrlParts = this.selectedTab.url.split('/');
            if (this.currentUrlParts.length === this.selectedUrlParts.length
                && this.currentUrlParts[3] === this.selectedUrlParts[3]) {
                return true;
            }
        }
        return false;
    }

    private selectTabByUrl(url: string): void {
        if (this.tabs != null && this.tabs.length > 0) {
            for (let index = 0; index < this.tabs.length; index++) {
                if (this.tabs[index].url === url) {
                    this.selectedTabIndex = index;
                    this.selectedTab = this.tabs[index];
                    break;
                }
            }
        }
    }

    private addCurrentUrl(url: string): void {
        if (this.tabs != null && this.tabs.length > 0) {
            this.currentUrl = url;
            this.tabs[this.tabs.length - 1].url = url;
        }
    }

    private isActiveByUrl(url: string): boolean {
        if (this.selectedTab !== null && this.selectedTab !== undefined && url === this.selectedTab.url) {
            return true;
        }
        return false;
    }

    private isRouteAlreadyExist(url: string): boolean {
        if (this.tabs != null && this.tabs.length > 0) {
            for (const tab of this.tabs) {
                if (tab.url === url) {
                    return true;
                }
            }
        }
        return false;
    }

    // private setNextTabId() {
    //     if (this.nextTabId === 0) {
    //         this.nextTabId = 1;
    //     } else {
    //         if (this.tabs != null
    //             && this.tabs.length > 0) {
    //             this.maxId = 0;
    //             for (const tab of this.tabs) {
    //                 if (this.maxId < tab.id) {
    //                     this.maxId = tab.id;
    //                 }
    //             }
    //             this.nextTabId = this.maxId + 1;
    //         }
    //     }
    // }
}
