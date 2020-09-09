import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
