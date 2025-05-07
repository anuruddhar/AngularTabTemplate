import { Directive, ElementRef, OnInit, AfterViewInit, OnDestroy, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCopyText]'
})
export class CopyTextDirective implements OnInit, AfterViewInit, OnDestroy {
  @Output() OnTextCopied: EventEmitter<any> = new EventEmitter();

  private textEl!: HTMLElement;
  private listeners = [];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.textEl = this.el.nativeElement as HTMLElement;
    this.textEl.style.cursor = 'copy';

    /*
    const clickListener = this.renderer.listen(
      this.el.nativeElement,
      'click',
      this.onClickOnText.bind(this)
    );
    this.listeners.push(clickListener);

    const mouseEnterListener = this.renderer.listen(
      this.el.nativeElement,
      'mouseenter',
      this.onMouseEnter.bind(this)
    );
    this.listeners.push(mouseEnterListener);

    const mouseLeaveListener = this.renderer.listen(
      this.el.nativeElement,
      'mouseleave',
      this.onMouseLeave.bind(this)
    );
    this.listeners.push(mouseLeaveListener);
    */
  }

  ngOnDestroy() {
     // this.listeners.forEach(fn => fn());
  }

  private onMouseEnter(): void {
    this.textEl.style.textDecoration = 'underline';
  }

  private onMouseLeave(): void {
    this.textEl.style.textDecoration = 'none';
  }

  private onClickOnText(): void {
    // Execute Copy
    const el = document.createElement('textarea');
    el.value = this.textEl.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.OnTextCopied.emit(this.textEl.innerText);
  }
}
