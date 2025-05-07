import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { ActionMenuComponent } from './action-menu.component';
import { ActionMenuItem } from '../../models/action-menu-item.model';

describe('Shared: AppActionMenuComponent', () => {
  let component: ActionMenuComponent;
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<ActionMenuComponent>;
  let fixturetestHostComponent: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionMenuComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMenuComponent);
    fixturetestHostComponent = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    testHostComponent = fixturetestHostComponent.componentInstance;

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });


  it('should change hide the menu if showing when the "showOrHideSubMenu()" is called', () => {
    testHostComponent.appActionMenuComponent.showSubMenu = true;
    testHostComponent.appActionMenuComponent.showOrHideSubMenu();
    expect(testHostComponent.appActionMenuComponent.showSubMenu).toBeFalsy();
  });


  it('should change show the menu if not showing when the "showOrHideSubMenu()" is called', () => {
    testHostComponent.appActionMenuComponent.showSubMenu = false;
    testHostComponent.appActionMenuComponent.showOrHideSubMenu();
    expect(testHostComponent.appActionMenuComponent.showSubMenu).toBeTruthy();
  });


  it('should display the passed menu items', () => {
    fixturetestHostComponent.detectChanges();
    expect(testHostComponent.appActionMenuComponent.actionMenuItems.length).toEqual(2);
  });


  it('should raise an event when an action is clicked', () => {
    const performActionSpy = spyOn(testHostComponent, 'performAction').and.callThrough();
    fixturetestHostComponent.detectChanges();
    testHostComponent.appActionMenuComponent.actionMenuItemClicked(new ActionMenuItem());
    expect(performActionSpy).toHaveBeenCalledTimes(1);
  });


  @Component({
    selector: 'app-host-component',
    template: `<app-action-menu [ActionMenuItems] = "actionMenuItems" (ActionMenuItemClicked) ="performAction($event)" ></app-action-menu>`
  })
  class TestHostComponent {
    @ViewChild(ActionMenuComponent)
    public appActionMenuComponent: ActionMenuComponent;
    private actionMenuItems: ActionMenuItem[] = new Array<ActionMenuItem>();
    constructor() {
      this.actionMenuItems.push({ Id: 1, Icon: 'fa fa-refresh', ToolTipText: 'Refresh', Class: '' });
      this.actionMenuItems.push({ Id: 2, Icon: 'fa fa-floppy-o', ToolTipText: 'Refresh', Class: '' });
    }

    performAction(id: number): void { }
  }

});


