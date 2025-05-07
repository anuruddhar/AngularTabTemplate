import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { AppMenuComponent } from '../app-menu/app-menu.component';
import { MenuItem } from '../models/app-menu.model';
import { MdiComponent } from '../mdi/mdi.component';

@Component({
  selector: 'app-submenu',
  templateUrl: './app-sub-menu.component.html',
  styleUrls: ['./app-sub-menu.component.css'],
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
export class AppSubMenuComponent {
  @Input() root: boolean = false;
  @Input() visible!: boolean;

  //@Input() item:  MenuItem[] | MenuItem[][] = [];
//   _item!: MenuItem[] | MenuItem[][];
//   @Input() get item(): MenuItem[] | MenuItem[][] {
//     return this.item;
//   }
//   set item(value: MenuItem[] | MenuItem[][]) {
//     this.item = value;
//     this.mainitems = value as MenuItem[];
//   }
    @Input() item:  MenuItem[] = [];

  @Input() get reset(): boolean {
    return this.Reset;
  }
  set reset(val: boolean) {
    this.Reset = val;

    if (this.Reset && this.app.isHorizontal()) {
      this.activeIndex = undefined;
    }
  }

  @Input() get parentActive(): boolean {
    return this.ParentActive;
  }
  set parentActive(val: boolean) {
    this.ParentActive = val;

    if (!this.ParentActive) {
      this.activeIndex = undefined;
    }
  }

  ParentActive!: boolean;
  Reset!: boolean;
  activeIndex: number | undefined;

  mainitems: MenuItem[] = [];
  subitems: MenuItem[][] = [];

  constructor(public app: MdiComponent, public appMenu: AppMenuComponent) {}

  itemClick(event: Event, mnuItem: MenuItem, index: number): boolean {
    if (this.root) {
      this.app.menuHoverActive = !this.app.menuHoverActive;
    }
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
        this.appMenu.layoutMenuScrollerViewChild.moveBar();
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

  onMouseEnter(index: number) {
    if (
      this.root &&
      this.app.menuHoverActive &&
      this.app.isHorizontal() &&
      !this.app.isMobile() &&
      !this.app.isTablet()
    ) {
      this.activeIndex = index;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }
  
}
