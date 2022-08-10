import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { SaleComponent } from './sale/sale.component';
import { ProviderComponent } from "./prov/provider.component";

const routes: Routes = [
    {
      path: '',
      component: PagesComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'user', component: UserComponent},
        { path: 'sale', component: SaleComponent},
        { path: 'customer', component: CustomerComponent},
        { path: 'inventory', component: UserComponent},
        { path: 'provider', component: ProviderComponent},
        { path: 'order', component: ProviderComponent},
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PagesRoutingModule {}
  