import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  balance: number = 100000.40
  fullname: string = "José María"
  
  formatedBalance = this.balance.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  constructor() { }

  ngOnInit(): void {
    console.log(this.balance)
    console.log(this.formatedBalance)
    
  }

}

