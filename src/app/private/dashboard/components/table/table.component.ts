import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyInterface } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['icon', 'name', 'value', 'buySell']
  dataSource: MatTableDataSource<CurrencyInterface>
  width: number = 5

  constructor( private currencyService: CurrencyService) { }

  ngAfterViewInit() {
    this.currencyService
    .getAllCurrencies()
    .subscribe(
      (data) => {
        console.log("HELLO lista de comentarios")
        console.log(data)
        data.forEach(element => {
          element.icon = "/assets/images/" + element.icon
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
}

