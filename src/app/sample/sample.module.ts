import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlsComponent } from './controls/controls.component';
import { sampleComponentsRoutes } from './sample.routes';
import { SharedModule } from '../shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PasswordModule } from 'primeng/password';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu'; 
import { MenuModule } from 'primeng/menu'; 
import { CarouselModule } from 'primeng/carousel';
import { PickListModule } from 'primeng/picklist';
import { TreeModule } from 'primeng/tree';
import { OrderListModule } from 'primeng/orderlist';



@NgModule({
  declarations: [ControlsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(sampleComponentsRoutes),
    AutoCompleteModule,
    SplitButtonModule,
    PasswordModule,
    ListboxModule,
    PanelModule,
    TableModule,
    CarouselModule,
    PickListModule,
    MenuModule,
    PanelMenuModule,
    TreeModule,
    OrderListModule
    // CodeHighlighterModule
  ],
  providers: []
})
export class SampleModule { }
