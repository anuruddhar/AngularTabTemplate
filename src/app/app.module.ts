import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
//import { NgxLoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { GlobalVariable } from './shared/globals';
//import { MockModule } from './mock/mock.module';
import { AppConfigurationService } from './core/services/app-configuration.service';
// import 'hammerjs';

const importedModules: Array<any> = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  SharedModule,
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  //NgxLoadingModule.forRoot({}),
  ToastModule,
  CoreModule,
  FormsModule,
  ReactiveFormsModule
];

if (GlobalVariable.UseMock) {
  //importedModules.push(MockModule);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    importedModules
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: AppConfigurationService) => () => configService.loadConfigurations(),
      deps: [AppConfigurationService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
