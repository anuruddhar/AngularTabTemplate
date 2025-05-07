import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabFormViewModel } from '../../models/tab-form-view.model';

import { RefreshBaseComponent } from './refresh-base.component';

describe('RefreshBaseComponent', () => {
  let component: RefreshBaseComponent<TabFormViewModel>;
  let fixture: ComponentFixture<RefreshBaseComponent<TabFormViewModel>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
