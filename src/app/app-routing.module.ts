import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module')
      .then((moduleRoute) => moduleRoute.PublicModule),
  },
  {
    path: 'dashboard',
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
