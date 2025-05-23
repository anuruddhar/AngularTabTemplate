export class DomHandler {

    public static zindex = 1000;
    private static calculatedScrollbarWidth: number = 0;
    private static calculatedScrollbarHeight: number = 0;
    private static browser: any;

    public static addClass(element: any, className: string): void {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }

    public static addMultipleClasses(element: any, className: string): void {
        if (element.classList) {
            const styles: string[] = className.split(' ');
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < styles.length; i++) {
                element.classList.add(styles[i]);
            }

        } else {
            const styles: string[] = className.split(' ');
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < styles.length; i++) {
                element.className += ' ' + styles[i];
            }
        }
    }

    public static removeClass(element: any, className: string): void {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    public static hasClass(element: any, className: string): boolean {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }

    public static siblings(element: any): any {
        return Array.prototype.filter.call(element.parentNode.children, function (child) {
            return child !== element;
        });
    }

    public static find(element: any, selector: string): any[] {
        return Array.from(element.querySelectorAll(selector));
    }

    public static findSingle(element: any, selector: string): any {
        return element.querySelector(selector);
    }

    public static index(element: any): number {
        const children = element.parentNode.childNodes;
        let num = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < children.length; i++) {
            if (children[i] === element) { return num; }
            if (children[i].nodeType === 1) { num++; }
        }
        return -1;
    }

    public static indexWithinGroup(element: any, attributeName: string): number {
        const children = element.parentNode.childNodes;
        let num = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < children.length; i++) {
            if (children[i] === element) { return num; }
            if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType === 1) { num++; }
        }
        return -1;
    }

    public static relativePosition(element: any, target: any): void {
        const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight }
            : this.getHiddenElementDimensions(element);
        const targetHeight = target.offsetHeight;
        const targetOffset = target.getBoundingClientRect();
        const viewport = this.getViewport();
        let top: number;
        let left: number;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
            if (targetOffset.top + top < 0) {
                top = 0;
            }
        } else {
            top = targetHeight;
        }

        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
        } else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
        } else {
            // element fits on screen (align with target)
            left = 0;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    public static absolutePosition(element: any, target: any): void {
        const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight }
            : this.getHiddenElementDimensions(element);
        const elementOuterHeight = elementDimensions.height;
        const elementOuterWidth = elementDimensions.width;
        const targetOuterHeight = target.offsetHeight;
        const targetOuterWidth = target.offsetWidth;
        const targetOffset = target.getBoundingClientRect();
        const windowScrollTop = this.getWindowScrollTop();
        const windowScrollLeft = this.getWindowScrollLeft();
        const viewport = this.getViewport();
        let top;
        let left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = 0 + windowScrollTop;
            }
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
            left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
        } else {
            left = targetOffset.left + windowScrollLeft;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    public static getHiddenElementOuterHeight(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        const elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementHeight;
    }

    public static getHiddenElementOuterWidth(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        const elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementWidth;
    }

    public static getHiddenElementDimensions(element: any): any {
        const dimensions: any = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return dimensions;
    }

    public static scrollInView(container: any, item: any) {
        const borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
        const borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
        const paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
        const paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        const scroll = container.scrollTop;
        const elementHeight = container.clientHeight;
        const itemHeight = this.getOuterHeight(item);

        if (offset < 0) {
            container.scrollTop = scroll + offset;
        } else if ((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }

    public static fadeIn(element: any, duration: number): void {
        element.style.opacity = 0;

        let last = +new Date();
        let opacity = 0;
        const tick = () => {
            opacity = +element.style.opacity.replace(',', '.') + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();

            if (+opacity < 1) {
                // tslint:disable-next-line:no-unused-expression
                // Todo //(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                (requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }

    public static fadeOut(element: any, ms: any) {
        let opacity = 1;
        const interval = 50;
        const duration = ms;
        const gap = interval / duration;

        const fading = setInterval(() => {
            opacity = opacity - gap;

            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }

            element.style.opacity = opacity;
        }, interval);
    }

    public static getWindowScrollTop(): number {
        const doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    public static getWindowScrollLeft(): number {
        let doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }

    public static matches(element: any, selector: string): boolean {
        const p = Element.prototype;
        // tslint:disable-next-line:no-string-literal
        // Todo
        // const f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
        //     return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        // };
        //return f.call(element, selector);
        return true;
    }

    public static getOuterWidth(el: any, margin?: any) {
        let width = el.offsetWidth;

        if (margin) {
            const style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
    }

    public static getHorizontalPadding(el: any) {
        const style = getComputedStyle(el);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }

    public static getHorizontalMargin(el:any) {
        const style = getComputedStyle(el);
        return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    public static innerWidth(el:any) {
        let width = el.offsetWidth;
        const style = getComputedStyle(el);

        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }

    public static width(el:any) {
        let width = el.offsetWidth;
        const style = getComputedStyle(el);

        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }

    public static getInnerHeight(el:any) {
        let height = el.offsetHeight;
        const style = getComputedStyle(el);

        height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return height;
    }

    public static getOuterHeight(el:any, margin? :any) {
        let height = el.offsetHeight;

        if (margin) {
            const style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
    }

    public static getHeight(el:any): number {
        let height = el.offsetHeight;
        const style = getComputedStyle(el);

        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
            + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

        return height;
    }

    public static getWidth(el:any): number {
        let width = el.offsetWidth;
        const style = getComputedStyle(el);

        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
            + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

        return width;
    }

    public static getViewport(): any {
        let win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;

        return { width: w, height: h };
    }

    public static getOffset(el:any) {
        const rect = el.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }

    public static replaceElementWith(element: any, replacementElement: any): any {
        const parentNode = element.parentNode;
        if (!parentNode) {
            // tslint:disable-next-line:no-string-throw
            throw `Can't replace element`;
        }
        return parentNode.replaceChild(replacementElement, element);
    }

    public static getUserAgent(): string {
        return navigator.userAgent;
    }

    public static isIE() {
        const ua = window.navigator.userAgent;

        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        }

        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');
            return true;
        }

        const edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return true;
        }

        // other browser
        return false;
    }

    public static isIOS() {
        // tslint:disable-next-line:no-string-literal
        // Todo
        //return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
        return false;
    }

    public static appendChild(element: any, target: any) {
        if (this.isElement(target)) {
            target.appendChild(element);
        } else if (target.el && target.el.nativeElement) {
            target.el.nativeElement.appendChild(element);
        } else {
            throw new Error('Cannot append ' + target + ' to ' + element);
        }
    }

    public static removeChild(element: any, target: any) {
        if (this.isElement(target)) {
            target.removeChild(element);
        } else if (target.el && target.el.nativeElement) {
            target.el.nativeElement.removeChild(element);
        } else {
            throw new Error('Cannot remove ' + element + ' from ' + target);
        }
    }

    public static isElement(obj: any) {
        return (typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
            obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
        );
    }

    public static calculateScrollbarWidth(): number {
        if (this.calculatedScrollbarWidth !== null) {
            return this.calculatedScrollbarWidth;
        }

        const scrollDiv = document.createElement('div');
        scrollDiv.className = 'ui-scrollbar-measure';
        document.body.appendChild(scrollDiv);

        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);

        this.calculatedScrollbarWidth = scrollbarWidth;

        return scrollbarWidth;
    }

    public static calculateScrollbarHeight(): number {
        if (this.calculatedScrollbarHeight !== null) {
            return this.calculatedScrollbarHeight;
        }

        const scrollDiv = document.createElement('div');
        scrollDiv.className = 'ui-scrollbar-measure';
        document.body.appendChild(scrollDiv);

        const scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        document.body.removeChild(scrollDiv);

        this.calculatedScrollbarWidth = scrollbarHeight;

        return scrollbarHeight;
    }

    public static invokeElementMethod(element: any, methodName: string, args?: any[]): void {
        (element as any)[methodName].apply(element, args);
    }

    public static clearSelection(): void {
        if (window.getSelection) {
            if (window.getSelection()?.empty) {
                window.getSelection()?.empty();
            } 
            // Todo
            // else if (window.getSelection()?.removeAllRanges
            //     && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
            //     window.getSelection().removeAllRanges();
            // }
            // tslint:disable-next-line:no-string-literal
        // Todo   
        // } else if (document['selection'] && document['selection'].empty) {
        //     try {
        //         // tslint:disable-next-line:no-string-literal
        //         document['selection'].empty();
        //     } catch (error) {
        //         // ignore IE bug
        //     }
        }
    }

    public static getBrowser() {
        if (!this.browser) {
            const matched = this.resolveUserAgent();
            this.browser = {};

            if (matched.browser) {
                this.browser[matched.browser] = true;
                // tslint:disable-next-line:no-string-literal
                this.browser['version'] = matched.version;
            }

            // tslint:disable-next-line:no-string-literal
            if (this.browser['chrome']) {
                // tslint:disable-next-line:no-string-literal
                this.browser['webkit'] = true;
                // tslint:disable-next-line:no-string-literal
            } else if (this.browser['webkit']) {
                // tslint:disable-next-line:no-string-literal
                this.browser['safari'] = true;
            }
        }

        return this.browser;
    }

    public static resolveUserAgent() {
        const ua = navigator.userAgent.toLowerCase();
        const match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || '',
            version: match[2] || '0'
        };
    }

    public static isInteger(value: any): boolean {
        if (Number.isInteger) {
            return Number.isInteger(value);
        } else {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        }
    }

    public static isHidden(element: HTMLElement): boolean {
        return element.offsetParent === null;
    }
}
