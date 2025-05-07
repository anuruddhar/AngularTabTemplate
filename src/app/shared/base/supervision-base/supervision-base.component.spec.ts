import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabFormViewModel } from '../../models/tab-form-view.model';

import { SupervisionBaseComponent } from './supervision-base.component';

describe('SupervisionBaseComponent', () => {
  let component: SupervisionBaseComponent<TabFormViewModel>;
  let fixture: ComponentFixture<SupervisionBaseComponent<TabFormViewModel>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisionBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
