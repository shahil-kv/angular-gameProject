import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * we are creating a reactive form inside the register form and we created a new object for that
 * ? we are creating new form in the register template file and
 * * Form control is used for managing the state in the form like valid  from a control element
 */

export class RegisterComponent {

  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('',
    [
      Validators.required,
      /**
        * * The validator min age used  to sign in the website age more than 18
        * * the validator max for max age in the website
       *  */
      Validators.min(18),
      Validators.max(120)
    ]);
  password = new FormControl('');
  confirm_password = new FormControl('');
  phoneNumber = new FormControl('')

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })


}
