import { Component, Input, AfterViewInit, OnDestroy, ElementRef, NgZone, ViewChild } from '@angular/core';
import { DomHandler } from './dom-handler';

@Component({
    selector: 'app-scroll-panel',
    templateUrl: './scroll-panel.component.html',
    styleUrls: ['./scroll-panel.component.css']
})
export class ScrollPanelComponent implements AfterViewInit, OnDestroy {
    scrollYRatio!: number;
    scrollXRatio!: number;
    initialized!: boolean;
    lastPageY!: number;
    lastPageX!: number;
    isXBarClicked!: boolean;
    isYBarClicked!: boolean;

    @Input() style: any;
    @Input() styleClass!: string;

    constructor(public el: ElementRef, public zone: NgZone) { }

    @ViewChild('container') containerViewChild!: ElementRef;
    @ViewChild('content') contentViewChild!: ElementRef;
    @ViewChild('xBar') xBarViewChild!: ElementRef;
    @ViewChild('yBar') yBarViewChild!: ElementRef;

    timeoutFrame: any = (fn: any) => setTimeout(fn, 0);


    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);
            this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
            this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
            this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
            this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);

            window.addEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.addEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.addEventListener('mousedown', this.onYBarMouseDown);

            this.calculateContainerHeight();

            this.initialized = true;
        });
    }

    calculateContainerHeight() {
        const container = this.containerViewChild.nativeElement;
        const content = this.contentViewChild.nativeElement;
        const xBar = this.xBarViewChild.nativeElement;

        const containerStyles = getComputedStyle(container);
        const xBarStyles = getComputedStyle(xBar);
        const pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles.height, 10);

        // Todo
        // if (containerStyles['max-height'] !== 'none' && pureContainerHeight === 0) {
        //     if (content.offsetHeight + parseInt(xBarStyles.height, 10) > parseInt(containerStyles['max-height'], 10)) {
        //         container.style.height = containerStyles['max-height'];
        //     } else {
        //         container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop)
        //         + parseFloat(containerStyles.paddingBottom)
        //         + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
        //     }
        // }
    }

    moveBar() {
        const container = this.containerViewChild.nativeElement;
        const content = this.contentViewChild.nativeElement;

        /* horizontal scroll */
        const xBar = this.xBarViewChild.nativeElement;
        const totalWidth = content.scrollWidth;
        const ownWidth = content.clientWidth;
        const bottom = (container.clientHeight - xBar.clientHeight) * -1;

        this.scrollXRatio = ownWidth / totalWidth;

        /* vertical scroll */
        const yBar = this.yBarViewChild.nativeElement;
        const totalHeight = content.scrollHeight;
        const ownHeight = content.clientHeight;
        const right = (container.clientWidth - yBar.clientWidth) * -1;

        this.scrollYRatio = ownHeight / totalHeight;

        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                DomHandler.addClass(xBar, 'ui-scrollpanel-hidden');
            } else {
                DomHandler.removeClass(xBar, 'ui-scrollpanel-hidden');
                xBar.style.cssText = 'width:' + Math.max(this.scrollXRatio * 100, 10) + '%; left:'
                + (content.scrollLeft / totalWidth) * 100 + '%;bottom:' + bottom + 'px;';
            }

            if (this.scrollYRatio >= 1) {
                DomHandler.addClass(yBar, 'ui-scrollpanel-hidden');
            } else {
                DomHandler.removeClass(yBar, 'ui-scrollpanel-hidden');
                yBar.style.cssText = 'height:' + Math.max(this.scrollYRatio * 100, 10)
                + '%; top: calc(' + (content.scrollTop / totalHeight) * 100 + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
    }

    onYBarMouseDown(e: MouseEvent) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');

        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }

    onXBarMouseDown(e: MouseEvent) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');

        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }

    onDocumentMouseMove(e: MouseEvent) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        } else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        } else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }

    }

    onMouseMoveForXBar(e: MouseEvent) {
        const deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;

        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }

    onMouseMoveForYBar(e: MouseEvent) {
        const deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;

        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }

    scrollTop(scrollTop: number) {
        const scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }

    onDocumentMouseUp(e: Event) {
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(document.body, 'ui-scrollpanel-grabbed');

        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }

    // tslint:disable-next-line:ban-types
    requestAnimationFrame(f: Function) {
        const frame = window.requestAnimationFrame || this.timeoutFrame;
        // Todo
        //frame(f);
    }

    refresh() {
        this.moveBar();
    }

    ngOnDestroy() {
        if (this.initialized) {
            window.removeEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
        }
    }

}
