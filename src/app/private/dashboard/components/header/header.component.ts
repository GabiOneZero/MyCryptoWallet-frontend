import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private userService: UserService) { }

  ngOnInit(): void {
    if (!!sessionStorage.getItem('userId')) {
      this.userId = sessionStorage.getItem('userId')
    }else{
      this.userId = ''
    }
    
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
            console.log("Usuario not found in dashboard")
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

}

