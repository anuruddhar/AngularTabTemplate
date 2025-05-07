import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from './shared/shared.module';
import { CanLoadGuard } from './core/services/can-load.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'landing-page',
  loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule), canLoad: [CanLoadGuard]},
 { path: 'mdi',  loadChildren: () => import('./app-main/app-main.module').then(m => m.AppMainModule), canLoad: [CanLoadGuard]},
];

@NgModule({
  declarations: [LoginComponent],
  imports: [ DropdownModule, SharedModule, RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
