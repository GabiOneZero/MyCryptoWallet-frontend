import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BuymodalComponent } from './components/buymodal/buymodal.component';
import { SellmodalComponent } from './components/sellmodal/sellmodal.component';
import { MoneymodalComponent } from './components/moneymodal/moneymodal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    DashboardComponent,
    BuymodalComponent,
    SellmodalComponent,
    MoneymodalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
