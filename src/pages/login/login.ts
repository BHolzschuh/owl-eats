import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { AuthServiceProvider } from '../../providers/firebase-auth/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AuthServiceProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
    const result = await this.afAuth.loginUser(user)
    if (result) {
      this.navCtrl.setRoot(HomePage);
    }
    else {
      //add error message to screen
    }
  }


  register() {
    this.navCtrl.push('RegisterPage');
  }

}
