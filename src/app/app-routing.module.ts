import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {SignupComponent} from "./auth/components/signup/signup.component";
import {DashboardComponent} from "./modules/customer/components/dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";
import {MonthlySalesComponent} from "./modules/customer/components/dashboard/monthly-sales/monthly-sales.component";
import {BrandSalesComponent} from "./modules/customer/components/dashboard/brand-sales/brand-sales.component";
import {TableComponent} from "./modules/customer/components/dashboard/tables/table/table.component";
import {CityTableComponent} from "./modules/customer/components/dashboard/tables/city-table/city-table.component";
import {Graph2Component} from "./modules/customer/components/dashboard/graphs/graph2/graph2.component";
import {Graph1Component} from "./modules/customer/components/dashboard/graphs/graph1/graph1.component";
import {Graph3Component} from "./modules/customer/components/dashboard/graphs/graph3/graph3.component";
import {Graph31Component} from "./modules/customer/components/dashboard/graphs/graph3-1/graph3-1.component";
import {Graph4Component} from "./modules/customer/components/dashboard/graphs/graph4/graph4.component";
import {Graph41Component} from "./modules/customer/components/dashboard/graphs/graph4-1/graph4-1.component";
import {Graph5Component} from "./modules/customer/components/dashboard/graphs/graph5/graph5.component";
import {Graph6Component} from "./modules/customer/components/dashboard/graphs/graph6/graph6.component";

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full",},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path:"admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path:"customer", loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule), canActivate: [AuthGuard]},
  { path: 'monthly-sales/:year', component: MonthlySalesComponent , canActivate: [AuthGuard]},
  { path: 'brands/:year/:month', component: BrandSalesComponent, canActivate: [AuthGuard] },
  { path: 'table', component: TableComponent , canActivate: [AuthGuard] },
  { path: 'city-table', component: CityTableComponent , canActivate: [AuthGuard] },
  { path: 'graph1', component: Graph1Component , canActivate: [AuthGuard] },
  { path: 'graph2', component: Graph2Component , canActivate: [AuthGuard] },
  { path: 'graph3', component: Graph3Component , canActivate: [AuthGuard] },
  { path: 'graph3-1', component: Graph31Component , canActivate: [AuthGuard] },
  { path: 'graph4', component: Graph4Component , canActivate: [AuthGuard] },
  { path: 'graph4-1', component: Graph41Component , canActivate: [AuthGuard] },
  { path: 'graph5', component: Graph5Component , canActivate: [AuthGuard] },
  { path: 'graph6', component: Graph6Component , canActivate: [AuthGuard] },









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
