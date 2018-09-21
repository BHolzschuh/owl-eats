import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from '../home/home';

export class Entry {
  uid: string;
  first: string;
  last: string;
}

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  entry = {} as Entry;
  message;

  constructor(private afAuth: AngularFireAuth, private afData: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        //add user id and names to database
        this.createEntry(this.user.first, this.user.last, result.uid)

        this.navCtrl.setRoot(HomePage)
      }
    }
    catch (e) {
      console.error(e);
      this.message = e;
    }
  }

  createEntry(first: string, last: string, uid: string) {
    this.entry.first = first;
    this.entry.last = last;
    this.entry.uid = uid;
    this.afData.list('/userInfo/').push(this.entry)
  }

}
