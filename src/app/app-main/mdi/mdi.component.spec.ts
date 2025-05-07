import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService } from 'primeng/api';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';

import { MdiComponent } from './mdi.component';

xdescribe('MdiComponent', () => {
  let component: MdiComponent;
  let fixture: ComponentFixture<MdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MdiComponent ],
      providers: [ RouteManagerService, AuthorizationService, ConfirmationService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
