import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(){
    const minInputLength = 4;
    
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(minInputLength)]],
      password: ['', [Validators.required, Validators.minLength(minInputLength)]],
      repeatPass: ['', [Validators.required, Validators.minLength(minInputLength)]],
      fullname: ['', [Validators.required, Validators.minLength(minInputLength)]],
      email: ['', [Validators.required, Validators.email]],
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

  register() {
    const user = this.formGroup.value;
    console.log(user);
  }

}
