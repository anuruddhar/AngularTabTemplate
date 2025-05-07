import { Routes, } from '@angular/router';

import { MdiComponent } from './mdi/mdi.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { CanActivateChildGuard } from '../core/services/can-activate-child.guard';
import { CanActivateGuard } from '../core/services/can-activate.guard';
import { DummyComponent } from './dummy/dummy.component';

export const mdiRoutes: Routes = [
  {
    path: '', component: MdiComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'un-authorized', component: UnAuthorizedComponent,
            canActivate: [CanActivateGuard]
          },
          {
            path: 'dummy', component: DummyComponent, canActivate: [CanActivateGuard]
          },
          {
            path: 'sample', loadChildren: () => import('../sample/sample.module').then(m => m.SampleModule),
            canActivateChild: [CanActivateChildGuard]
          },
          // {
          //   path: 'common', loadChildren: () => import('../common/common.module').then(m => m.CommonModule),
          //   canActivateChild: [CanActivateChildGuard]
          // },
          // {
          //   path: 'dashboard', loadChildren: () => import('../cockpit/cockpit.module').then(m => m.CockpitModule),
          //   canActivateChild: [CanActivateChildGuard]
          // },
          // {
          //   path: 'initialization', loadChildren: () => import('../initialization/initialization.module').then(m => m.InitializationModule),
          //   canActivateChild: [CanActivateChildGuard]
          // }
        ],
      }
    ]
  }
];
