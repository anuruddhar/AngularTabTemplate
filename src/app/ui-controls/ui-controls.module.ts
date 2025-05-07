import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlInputComponent } from './al-input/al-input.component';
import { InputTextModule } from 'primeng/inputtext';

export const components = [
  AlInputComponent
];


@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    InputTextModule,
    CommonModule
  ]
})
export class UiControlsModule { }
