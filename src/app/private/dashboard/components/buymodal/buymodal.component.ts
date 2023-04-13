import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyInterface } from '../../models/currency.model';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-buymodal',
  templateUrl: './buymodal.component.html',
  styleUrls: ['./buymodal.component.scss']
})
export class BuymodalComponent implements OnInit {
  currency : CurrencyInterface
  maxQuantity : number
  userBalance: any
  quantity = new FormControl('')
  userId = sessionStorage.getItem('userId')
  username = sessionStorage.getItem('username')
  fullname = sessionStorage.getItem('fullname')
  password = sessionStorage.getItem('password')
  email = sessionStorage.getItem('email')
  balance : any = sessionStorage.getItem('balance')
  newBalance : any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BuymodalComponent>,
    private currencyService: CurrencyService,
    private userService: UserService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.currencyService
    .getCurrencyById(this.data.currencyId)
    .subscribe(
      (currency) => {
        console.log("HELLO currency info")
        console.log(currency)
        this.currency = currency
        this.userBalance = sessionStorage.getItem('balance')
        this.maxQuantity = JSON.parse(this.userBalance) / this.currency.value
        console.log("Max Quantity")        
        console.log(JSON.parse(this.userBalance))
        console.log("/")
        console.log(this.currency.value)
        console.log('=')
        console.log(this.maxQuantity)
      },
      (err) => {
        this.handleError(err)
      }
    )    
    
  }

  isNumberKey(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57))){
      return false;
    }
    return true;
  }

  handleError(error: any) {
    if (error.status === 500) {
       console.log(error)
    }
  }

  buy(){
    let quantity = this.quantity.value
    if (quantity <= this.maxQuantity && quantity > 0) {
      this.toast.success('Purchased')
      quantity = +this.data.inWallet + +quantity
      console.log("############@@@@@@@@@@")
      console.log(this.data.inWallet)
      this.userService
      .updateWallet(this.data.currencyId, this.userId, quantity)
      .subscribe(
        (data) => {
          console.log("HELLO currency info")
          console.log(data)
          
          this.dialogRef.close();
        },
        (err) => {
          this.handleError(err)
        })
      
    }else{
      if (quantity <= 0) {
        this.toast.error('Enter an amount')
      }else{
        this.toast.error('Not enough in the wallet')
      }
    }    
  }

  
}
