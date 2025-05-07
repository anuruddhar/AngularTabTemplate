import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { WidgetItem } from '../../models/common/widget-item.model';
// import { ngxLoadingAnimationTypes } from 'ngx-loading';
import '../../utility/extension-method';


@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.css']
})
export class WidgetPanelComponent implements AfterViewInit {

  MaxItemToshow!: number;
  IsShowPreNex: boolean;
  WidgetsToShow: Array<WidgetItem>;
  @Input() Widgets: Array<WidgetItem>;
  @Output() WidgetItemClicked = new EventEmitter<WidgetItem>();
  primaryColour!: string;
  //public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public coloursEnabled = true;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    // animationType: ngxLoadingAnimationTypes.rotatingPlane, 
    backdropBorderRadius: '3px',
    backdropBackgroundColour: '#ffffff'
  };
  // public config = {animationType: ngxLoadingAnimationTypes.rotatingPlane, 
  //   backdropBorderRadius: '3px'};


  private leftPosition = 0;
  private rightPosition = 0;

  @ViewChild('widgetContainer') WidgetContainer!: ElementRef;

  constructor() {
    this.WidgetsToShow = Array<WidgetItem>();
    this.Widgets = new Array<WidgetItem>();
    this.IsShowPreNex = false;
  }

  @HostListener('window:resize')
  onWindowResize() {
    setTimeout((() => {
      this.setSizing();
      this.showHidePreviousAndNext();
    }).bind(this), 100);
  }

  ngAfterViewInit(): void {
    setTimeout((() => {
      this.setSizing();
      this.showHidePreviousAndNext();
      if (this.Widgets.IsNotNullOrEmpty()) {
        this.Widgets.forEach(element => {
          element.loadData();
        });
      }

    }).bind(this), 100);

  }

  showPrevious(): void {
    if (this.leftPosition === 0) {
      return;
    }
    this.leftPosition = this.leftPosition - 1;
    this.rightPosition = this.rightPosition - 1;
    this.showData();
  }

  showNext(): void {
    if (this.rightPosition === this.Widgets.length - 1) {
      return;
    }
    this.leftPosition = this.leftPosition + 1;
    this.rightPosition = this.rightPosition + 1;
    this.showData();
  }

  onItemClicked(widgetItem: WidgetItem): void {
    this.WidgetItemClicked.emit(widgetItem);
  }

  private setSizing(): void {
    if (this.WidgetContainer.nativeElement.offsetWidth <= 800) {
      this.MaxItemToshow = 4;
    } else if (this.WidgetContainer.nativeElement.offsetWidth >= 800 && this.WidgetContainer.nativeElement.offsetWidth <= 1500) {
      this.MaxItemToshow = 5;
    } else if (this.WidgetContainer.nativeElement.offsetWidth >= 1500) {
      this.MaxItemToshow = 6;
    }
  }

  private showHidePreviousAndNext(): void {
    if (this.Widgets !== undefined && this.Widgets.length > this.MaxItemToshow) {
      this.IsShowPreNex = true;
      this.leftPosition = 0;
      this.rightPosition = this.MaxItemToshow - 1;
      this.showData();
    } else {
      this.IsShowPreNex = false;
      this.leftPosition = 0;
      this.rightPosition = this.Widgets.length - 1;
      this.showData();
    }
  }

  private showData(): void {
    this.WidgetsToShow = new Array();
    for (let i = this.leftPosition; i <= this.rightPosition; i++) {
      this.WidgetsToShow.push(this.Widgets[i]);
    }
  }

}
