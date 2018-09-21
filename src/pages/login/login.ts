import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Creating the FormGroup using FormBuilder
  loginForm = this.fb.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ])],
    password: ['', Validators.required],
  });

  user = {} as User;
  message;

  //constructs all necessary objects
  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  //tries to log the user into the system
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      //console.log(result);
      if (result) {
        this.navCtrl.setRoot(HomePage)
      }
    }
    catch (e) {
      console.error(e);
      this.checkErrors(e.code);
    }
  }

  //compares error code with possible throws
  checkErrors(error: String) {
    if (error == "auth/invalid-email") {
      this.message = "Invalid Email Address";
    }
    else if (error == "auth/user-not-found" || error == "auth/wrong-password") {
      this.message = "Invalid Email/Password";
    }
    else if (error == "auth/argument-error") {
      this.message = "Please fill out both fields";
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email address is required' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
    ]
  }

}
