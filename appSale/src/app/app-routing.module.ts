import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('src/app/pages/pages.module').then((m) => m.PagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
