import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { PickListModule } from 'primeng/picklist';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';

import { BaseComponent } from './base/base.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { ScrollPanelComponent } from './components/scroll-panel/scroll-panel.component';
import { SupervisionComponent } from './components/supervision/supervision.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DateByPeriodPipe } from './pipes/date-by-period.pipe';
import { WidgetPanelComponent } from './components/widget-panel/widget-panel.component';
import { UiControlsModule } from '../ui-controls/ui-controls.module';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchBaseComponent } from './base/search-base/search-base.component';
import { RefreshBaseComponent } from './base/refresh-base/refresh-base.component';
import { SaveBaseComponent } from './base/save-base/save-base.component';
import { SupervisionBaseComponent } from './base/supervision-base/supervision-base.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';

// import 'hammerjs';

// Pipes
import { TrimPipe } from './pipes/trim.pipe';
import { CopyTextDirective } from './directives/copy-text.directive';
import { TitleModuleModule } from '../title-module/title-module.module';

export const sharedModuleComponents = [
  BaseComponent,
  SearchBaseComponent,
  RefreshBaseComponent,
  SaveBaseComponent,
  SupervisionBaseComponent,
  ScrollPanelComponent,
  DropDownComponent,
  MultiSelectComponent,
  SupervisionComponent,
  WidgetPanelComponent,
  ActionMenuComponent,
  UpperCaseDirective,
  DataTableComponent,
  CopyTextDirective,
];

export const sharedModulePipes = [
  DateByPeriodPipe,
  FilterPipe,
  TrimPipe,
];

export const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  InputTextareaModule,
  ConfirmDialogModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  ConfirmDialogModule,
  ContextMenuModule,
  DialogModule,
  DropdownModule,
  RadioButtonModule,
  TableModule,
  TabViewModule,
  SelectButtonModule,
  InputSwitchModule,
  TreeTableModule,
  MultiSelectModule,
  PickListModule,
  InputMaskModule,
  FileUploadModule,
  OverlayPanelModule,
  TooltipModule,
  UiControlsModule,
  TitleModuleModule,
];

@NgModule({
  declarations: [...sharedModuleComponents, ...sharedModulePipes],
  imports: [...sharedModules],
  exports: [...sharedModules, ...sharedModuleComponents, ...sharedModulePipes],
})
export class SharedModule {}
