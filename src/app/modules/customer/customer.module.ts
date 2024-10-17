import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatCardModule} from "@angular/material/card";
import { BrandSalesComponent } from './components/dashboard/brand-sales/brand-sales.component';
import { TableComponent } from './components/dashboard/tables/table/table.component';
import {MatPaginator} from "@angular/material/paginator";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import { CityTableComponent } from './components/dashboard/tables/city-table/city-table.component';
import { Graph2Component } from './components/dashboard/graphs/graph2/graph2.component';
import { Graph1Component } from './components/dashboard/graphs/graph1/graph1.component';
import { Graph3Component } from './components/dashboard/graphs/graph3/graph3.component';
import { Graph31Component } from './components/dashboard/graphs/graph3-1/graph3-1.component';
import { Graph4Component } from './components/dashboard/graphs/graph4/graph4.component';
import { Graph41Component } from './components/dashboard/graphs/graph4-1/graph4-1.component';
import { Graph5Component } from './components/dashboard/graphs/graph5/graph5.component';
import { Graph6Component } from './components/dashboard/graphs/graph6/graph6.component';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import { LoadingComponent } from './components/dashboard/loading/loading.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@NgModule({
  declarations: [
    DashboardComponent,
    BrandSalesComponent,
    TableComponent,
    CityTableComponent,
    Graph2Component,
    Graph1Component,
    Graph3Component,
    Graph31Component,
    Graph4Component,
    Graph41Component,
    Graph5Component,
    Graph6Component,
    LoadingComponent,
  ],
  exports: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatCardModule,
    MatPaginator,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatIconButton,
    MatIcon,
    MatTabGroup,
    MatTab,
  ]
})
export class CustomerModule { }
