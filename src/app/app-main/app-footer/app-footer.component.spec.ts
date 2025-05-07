import { waitForAsync, ComponentFixture, TestBed, } from '@angular/core/testing';

import { AppFooterComponent } from './app-footer.component';
import { DebugElement } from '@angular/core';
import { GlobalVariable } from 'src/app/shared/globals';

describe('AppFooterComponent', () => {
  let component: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFooterComponent ]
    });
    fixture = TestBed.createComponent(AppFooterComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the copy rights and version information on the footer', () => {
    fixture.detectChanges();
    let date: string;
    let version: string = '';
    let dateCurrent: Date;
    let debugElelmentAppName: DebugElement;
    let debugElelmentCopyRights: DebugElement;
    let debugElelmentlocation: DebugElement;
    debugElelmentAppName = fixture.debugElement.query((de) => de.nativeElement.id === 'appName');
    debugElelmentCopyRights  = fixture.debugElement.query((de) => de.nativeElement.id === 'copyRights');
    debugElelmentlocation  = fixture.debugElement.query((de) => de.nativeElement.id === 'inv-location');
    dateCurrent =  new Date();
    date =  dateCurrent.getFullYear().toString();
    version = ' ' + component.global.Version + ' ';
    expect(debugElelmentAppName.nativeElement.innerText).toEqual(`AngularApp  - V${version}`);
    expect(debugElelmentCopyRights.nativeElement.innerText).toEqual(`Powered by FYXO © 2025 - ${date}`);
    expect(debugElelmentlocation.nativeElement.innerText).toEqual(`Hello`);
  });
});
