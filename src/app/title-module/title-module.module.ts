import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

export const TITLE: InjectionToken<string> = new InjectionToken<string>('TITLE');

@NgModule({
  declarations: [],
  providers: [{provide: TITLE, useValue: 'Title'}],
  imports: [
    CommonModule
  ]
})

export class TitleModuleModule { }
