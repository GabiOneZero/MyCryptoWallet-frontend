import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyInterface } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';
import { MatDialog } from '@angular/material/dialog';
import { BuymodalComponent } from '../buymodal/buymodal.component';
import { SellmodalComponent } from '../sellmodal/sellmodal.component';

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['icon', 'name', 'value', 'buySell', 'inWallet']
  dataSource: MatTableDataSource<CurrencyInterface>
  width: number = 8
  value: number

  constructor( 
    private currencyService: CurrencyService,
    private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.currencyService
    .getAllCurrencies()
    .subscribe(
      (data) => {
        console.log("HELLO lista de comentarios")
        console.log(data)
        data.forEach(element => {
          element.icon = "/assets/images/" + element.icon
          this.value = +element.value
          element.formatedValue =  this.value.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        })
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.currencyName.toLowerCase().includes(filter) || data.acronym.toLowerCase().includes(filter);
        }
      },
      (err) => {
        this.handleError(err)
      }
    )    
    
  }

  applyFilter(event: Event) {  
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase()
  }

  handleError(error: any) {
    if (error.status === 500) {
       console.log(error)
    }
  }

  buy(currencyId: string){
    this.dialog.open(BuymodalComponent, {data: {currencyId : currencyId}})
  }

  sell(currencyId: string){
    this.dialog.open(SellmodalComponent, {data: {currencyId : currencyId}})
  }
}

