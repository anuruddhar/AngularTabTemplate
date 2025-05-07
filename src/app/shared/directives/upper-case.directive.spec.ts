import { UpperCaseDirective } from './upper-case.directive';
import { ElementRef, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appUppercase>`
})
class TestUpperCaseDirectiveComponent {
  barcodeNo: string;
}


describe('Shared: UpperCaseDirective', () => {
  let component: TestUpperCaseDirectiveComponent;
  let fixture: ComponentFixture<TestUpperCaseDirectiveComponent>;
  let inplutEl: DebugElement;

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [UpperCaseDirective, TestUpperCaseDirectiveComponent]
      });
      fixture = TestBed.createComponent(TestUpperCaseDirectiveComponent);
      component = fixture.componentInstance;
      inplutEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

});
