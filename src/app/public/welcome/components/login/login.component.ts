import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  @Output() eventEmitter = new EventEmitter<boolean>()

  constructor(private formBuilder: FormBuilder) { }

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

  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (!!control) {
      if (control.touched && control.errors != null) {
      error = 'Please, field must contain 4 or more characters';
      }
    }    
    return error;
  }

  login() {
    const user = this.formGroup.value;
    console.log(user);
  }

  navigateToRegister(){
    this.eventEmitter.emit(false)
  }
}
