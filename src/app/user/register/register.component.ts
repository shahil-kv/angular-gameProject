import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';

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
  constructor(
    private auth: AuthService
  ) { }

  inSubmission = false
  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl<number | null>(null,
    [
      Validators.required,
      /**
        * * The validator min agee used  to sign in the website age more than 18
        * * the validator max for max age in the website
       *  */
      Validators.min(18),
      Validators.max(120)
    ]);
  password = new FormControl('', [
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    )
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.minLength(12),
    Validators.minLength(12),
    Validators.required
  ])

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })

  showAlert = false
  alertMsg = 'Please wait ! account is being created'
  alertColor = 'blue'

  // registration forms into firebase
  /***
   *  this is the main thing in the form we are pushing data to the firebase using when the button clicks
   *  when the button clicks then the function will trieger and then the form will complete the registration
   *  it is a async function so the result we will get we want to await for the thing to work
   * **/
  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait ! account is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true

    /**
     * we are checking the try and catch and await in the file so we will know when error comes
     * we are stopping other response to wait for this and they will return
     **/
    try {

      await this.auth.createUser(this.registerForm.value as IUser)
      /*****
       *  if any error comes to the code then we will have the catch if the user is not created in the backend
       * then alert mesg will change and then the color will change and the submission will not happen if it is error
       **/
    } catch (e) {
      console.log(e)
      this.alertMsg = "An unexpected error occurred.Please try again later"
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = "success ! your account created"
    this.alertColor = 'green'
  }

}
