import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-passreset',
  templateUrl: 'passreset.html',
})
export class PassresetPage {

  email = new FormControl('');
  isreset = false;
  message = "Reset email has been sent."
  eMessage = '';
  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async passReset(user: User) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(user.email);
      this.isreset = true;
    }
    catch (e) {
      console.error(e);
      this.checkErrors(e.code);
    }
  }

  //compares server side error code with possible throws
  checkErrors(error: String) {
    if (error == "auth/invalid-email") {
      this.eMessage = "Invalid Email Address";
    }
    else if (error == "auth/user-not-found") {
      this.eMessage = "Email not found";
    }
  }

}
