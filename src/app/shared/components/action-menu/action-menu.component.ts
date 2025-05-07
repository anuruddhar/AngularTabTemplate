import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ActionMenuItem } from '../../models/action-menu-item.model';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit {
  showSubMenu = false;
  actionMenuItems: ActionMenuItem[] = [];
  @Input() set ActionMenuItems(value: ActionMenuItem[]) {
    this.actionMenuItems = value;
  }
  @Output() ActionMenuItemClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  showOrHideSubMenu(): void {
    this.showSubMenu = !this.showSubMenu;
  }
  actionMenuItemClicked(actionMenuItem: ActionMenuItem) {
    this.ActionMenuItemClicked.emit(actionMenuItem.Id);
  }

}
