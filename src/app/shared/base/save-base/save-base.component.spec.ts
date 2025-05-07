import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabFormViewModel } from '../../models/tab-form-view.model';

import { SaveBaseComponent } from './save-base.component';

describe('SaveBaseComponent', () => {
  let component: SaveBaseComponent<TabFormViewModel>;
  let fixture: ComponentFixture<SaveBaseComponent<TabFormViewModel>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
