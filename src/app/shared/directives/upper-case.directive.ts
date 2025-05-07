import { Directive, Input, Output, EventEmitter, OnInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UpperCaseDirective implements OnInit {

  private el: HTMLInputElement;

  @Input() appUppercase!: string;
  @Output() UpperCaseChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.appUppercase = this.appUppercase || '';
    this.format(this.appUppercase);
  }

  format(value: any) {
    value = value.toUpperCase();
    this.UpperCaseChange.next(value);
  }


  @HostListener('keyup', ['$event.target.value'])
  onKey(value: any) {
    this.el.value = value.toUpperCase();
  }
}
