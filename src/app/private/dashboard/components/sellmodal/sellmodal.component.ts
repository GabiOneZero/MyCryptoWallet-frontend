import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyInterface } from '../../models/currency.model';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sellmodal',
  templateUrl: './sellmodal.component.html',
  styleUrls: ['./sellmodal.component.scss']
})
export class SellmodalComponent implements OnInit {
  currency : CurrencyInterface
  maxQuantity : number = this.data.inWallet
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
    public dialogRef: MatDialogRef<SellmodalComponent>,
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

  controlMax(){
    console.log('controlMax')
    if (this.quantity.value > this.maxQuantity) {
      this.quantity.setValue(this.maxQuantity)      
    }
  }

  sell(){
    let quantity = this.quantity.value
    if (quantity <= this.maxQuantity && quantity > 0) {
      this.toast.success('Sold')
      quantity = this.data.inWallet - quantity
      this.newBalance = JSON.parse(this.balance) + (quantity * this.data.value)
      console.log("############@@@@@@@@@@")
      console.log(this.newBalance)
      this.userService
      .updateWallet(this.data.currencyId, this.userId, quantity)
      .subscribe(
        (data) => {
          console.log("HELLO currency info")
          console.log(data)
          this.userService
          .updateUser(this.userId, this.username, this.fullname, this.password, this.email, this.newBalance)
          .subscribe(
            (data) => {
              console.log("HELLO currency info")
              console.log(data)
              this.dialogRef.close();
            },
            (err) => {
              this.handleError(err)
            })
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
