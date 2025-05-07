import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBase } from '../../models/search-base.model';

import { SearchBaseComponent } from './search-base.component';

describe('SearchBaseComponent', () => {
  let component: SearchBaseComponent<any, SearchBase>;
  let fixture: ComponentFixture<SearchBaseComponent<any, SearchBase>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
