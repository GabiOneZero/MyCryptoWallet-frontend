import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  @Output() emitterSpinner = new EventEmitter<boolean>()
  @Output() emitterLogin = new EventEmitter<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(){
    const minInputLength = 4;
    
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(minInputLength)]],
      password: ['', [Validators.required, Validators.minLength(minInputLength)]]
    });
  }

  login() {
    const user = this.formGroup.value;
    console.log(user);
    this.loginService
      .login(user.username, user.password)
      .subscribe(
        (data) => {
          if (!!data) {
            sessionStorage.setItem('userId', JSON.stringify(data.userId));
            sessionStorage.setItem('username', JSON.stringify(data.username));
            sessionStorage.setItem('email', JSON.stringify(data.email));
            sessionStorage.setItem('password', JSON.stringify(data.password));
            console.log('################################')
            console.log(sessionStorage.getItem('password'))
            sessionStorage.setItem('fullname', JSON.stringify(data.fullname));
            sessionStorage.setItem('balance', JSON.stringify(data.balance));
            console.log("Logged Succesfully")
            this.emitterSpinner.emit(true)
            console.log("Before timeout")
            setTimeout(this.navigateToDashboard, 1500, this.emitterLogin, this.emitterSpinner, this.router);    
          }else{
            this.toast.error("Username or Password incorrect", '', {timeOut: 3000})
            console.log("User not found")
          }
        },
        (err) => {
          this.handleError(err);
        }
      );
  }

  handleError(error: any) {
    if (error.status === 500) {
       console.log(error)
    }
  }

  navigateToRegister(){
    this.emitterLogin.emit(false)
  }

  navigateToDashboard(emitterLogin: EventEmitter<boolean>, emitterSpinner: EventEmitter<boolean>, router: Router){  
    emitterLogin.emit(false) 
    emitterSpinner.emit(false) 
    router.navigate(['/dashboard'])
    console.log("Waiting...TimeOut")    
  }
}
