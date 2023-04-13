import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-moneymodal',
  templateUrl: './moneymodal.component.html',
  styleUrls: ['./moneymodal.component.scss']
})
export class MoneymodalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
