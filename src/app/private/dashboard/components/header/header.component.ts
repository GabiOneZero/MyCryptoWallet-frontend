import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoneymodalComponent } from '../moneymodal/moneymodal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  userId: any 
  fullname: string 
  balance: number
  formatedBalance: string
  
  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId')
    
    this.userService
      .getUserData(this.userId)
      .subscribe(
        (data) => {
          console.log(data)
          if (!!data) {
            this.balance = +data.balance
            this.formatedBalance =  this.balance.toLocaleString('es-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
            console.log(typeof data.balance)
            console.log(this.formatedBalance)
            this.fullname = data.fullname
          }else{
            console.log("User not found in dashboard")
          }
        },
        (err) => {
          this.handleError(err);
        }
      );
  }

  logout(){
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('balance');
    sessionStorage.clear()
    console.log("Log out succesfully")
    this.router.navigate(['/'])
  }

  handleError(error: any) {
    if (error.status === 500) {
       console.log(error)
    }
  }

  openMoneyModal(userId : string){
    this.dialog.open(MoneymodalComponent, {data: {userId : userId}})
  }

}

