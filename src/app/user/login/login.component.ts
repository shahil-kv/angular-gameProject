import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }
  showAlert = false
  alertMesg = "please wait! We are logging you in"
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true
    this.alertMesg = "Please wait! We are logging you in."
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (e) {
      this.inSubmission = false
      this.alertMesg = "An expected error occurred.Please try again later"
      this.alertColor = 'red'
    }

    this.alertMesg = 'Sucess! You are now logged in'
    this.alertColor = 'green'
  }
}
