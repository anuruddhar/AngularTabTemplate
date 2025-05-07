import { Component } from '@angular/core';
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService } from 'primeng/api';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { mdiRoutes } from '../app-main.routes';
import { MdiComponent } from '../mdi/mdi.component';

import { AppMenuComponent } from './app-menu.component';

@Component({
  template: '<p>Mock MDI Component</p>'
})
class MockMdiComponent {}

describe('AppMenuComponent', () => {
  // let component: AppMenuComponent;
  // let fixture: ComponentFixture<AppMenuComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AppMenuComponent, MockMdiComponent],
  //     providers: [ AuthorizationService,
  //      { Provide: MdiComponent, useValue: MockMdiComponent}
  //     ],
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AppMenuComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
