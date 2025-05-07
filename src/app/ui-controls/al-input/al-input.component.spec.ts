import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlInputComponent } from './al-input.component';

describe('AlInputComponent', () => {
  let component: AlInputComponent;
  let fixture: ComponentFixture<AlInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
