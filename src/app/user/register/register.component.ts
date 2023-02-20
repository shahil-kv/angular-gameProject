import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  inSubmission = false
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
   * * this is the main thing in the form we are pushing data to the firebase using when the button clicks
   * * when the button clicks then the function will triger and then the form will complete the registration
   * * it is a async function so the result we will get we want to await for the thing to work
   * **/
  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait ! account is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true
    /***
     * ? this is the destructuring of the register form to get only the values need for the database
     * ? we only need the email and password for the database to store so we will only get these values from the
     * */
    const { email, password } = this.registerForm.value
    /**
     *  * we are checking the try and catch and await in the file so we will know when error comes
     * * we are stopping other response to wait for this and they will return
     **/
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email as string, password as string
      )
      /****
       * * in this we are creating a new collection in the db and the new collection name is used
       * * and the collection contains the document of the name,email,age,Phone number to the db named user
       *  * in the user they will create a uuid in the users collection a new document will always be created with a uuid
      */
      this.db.collection('users').add(
        {
          name: this.name.value,
          email: this.email.value,
          age: this.age.value,
          phoneNumber: this.phoneNumber.value
        })
      /*****
       * * if any error comes to the code then we will have the catch if the user is not created in the backend
       * * then alert mesg will change and then the color will change and the submission will not happen if it is error
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
