import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  showLogin : boolean = true
  showSpinner : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  navigateToRegister(event: boolean){
    this.showLogin = event
  }
  navigateToLogin(event: boolean){
    this.showLogin = event
  }
  navigateToDashboard(event: boolean){
    this.showSpinner = event
  }
}
