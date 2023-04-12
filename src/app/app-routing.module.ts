import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedGuard } from './private/user-logged.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module')
      .then((moduleRoute) => moduleRoute.PublicModule),
  },
  {
    path: 'dashboard',
    canActivate: [UserLoggedGuard],
    loadChildren: () =>
      import('./private/private.module')
      .then((moduleRoute) => moduleRoute.PrivateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
