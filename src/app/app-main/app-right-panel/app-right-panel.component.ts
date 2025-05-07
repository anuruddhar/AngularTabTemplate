import {Component, ViewChild, AfterViewInit} from '@angular/core';


import { MdiComponent } from '../mdi/mdi.component';
import { ScrollPanelComponent } from '../../shared/components/scroll-panel/scroll-panel.component';

@Component({
  selector: 'app-right-panel',
  templateUrl: './app-right-panel.component.html',
  styleUrls: ['./app-right-panel.component.css']
})
export class AppRightPanelComponent implements AfterViewInit {

  @ViewChild('scrollRightPanel') rightPanelMenuScrollerViewChild!: ScrollPanelComponent;

  constructor(public app: MdiComponent) {}

  ngAfterViewInit() {
      setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
  }

  onTabChange(event: any) {
      setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 450);
  }

}
