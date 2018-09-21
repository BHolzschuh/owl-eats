import { Component } from '@angular/core';
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

  user = {} as User;
  message;

  //constructs all necessary objects
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  //tries to log the user into the system
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      console.log(result);
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
      this.message = "Please enter a valid email";
    }
    else if (error == "auth/user-not-found") {
      this.message = "Incorrect email/password";
    }
    else if (error == "auth/argument-error") {
      this.message = "Please fill out both fields";
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}
