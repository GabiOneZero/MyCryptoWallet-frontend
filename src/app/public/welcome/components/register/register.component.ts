import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;
  @Output() eventEmitter = new EventEmitter<boolean>()
  @Output() emitterSpinner = new EventEmitter<boolean>()

  showPass: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toast: ToastrService) { }


  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(){
    const minInputLength = 4;
    
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(minInputLength)]],
      password: ['', [Validators.required, Validators.minLength(minInputLength)]],
      fullname: ['', [Validators.required, Validators.minLength(minInputLength)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (!!control) {
      if (control.touched && control.errors != null && control.value != '') {
        if (controlName == 'email') {
          error = 'Please, insert a valid email adress'
        }else{
          error = 'Please, field must contain 4 or more characters';
        }
      }
    }    
    return error;
  }

  register() {
    const user = this.formGroup.value;
    console.log(user);
    this.registerService
      .register(user.username, user.password, user.fullname, user.email)
      .subscribe(
        (data) => {
          console.log("User registered")
          console.log(data)
          if (!!data) {
            console.log("Registered Succesfully")
            this.toast.success("Username or Password incorrect", '', {timeOut: 3000})
            this.emitterSpinner.emit(true)
            console.log("Before timeout")
            setTimeout(this.registeredToLogin, 1500, this.eventEmitter, this.emitterSpinner, this.router);    
          }else{
            this.toast.error("Username or emial already exists", '', {timeOut: 3000})
            console.log("User already exists")
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

  navigateToLogin(){
    this.eventEmitter.emit(true)
  }

  showPassword(){
    this.showPass = !this.showPass
  }

  registeredToLogin(emitter : EventEmitter<boolean>, emitterSpinner: EventEmitter<boolean>, router: Router){
    emitter.emit(true)
    emitterSpinner.emit(false)
    router.navigate(['/'])
  }

}
