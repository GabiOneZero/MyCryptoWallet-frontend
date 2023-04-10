import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header/header.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';


@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
