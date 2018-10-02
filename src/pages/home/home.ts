import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';

import { FirebaseServiceProvider } from "../../providers/firebase-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  items: FirebaseListObservable<any[]>;
  newItem = '';

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    private db: AngularFireDatabase,
    public navCtrl: NavController, public fbS: FirebaseServiceProvider) {
    /*this.items = this.db.list('/userInfo/', {
      query: {
        orderByChild: 'first',
        equalTo: 'test'
      }
    });*/
    this.items = fbS.QueryTable('userInfo', 'first', 'brian');
  }

  /*
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email) {
        this.toast.create({
          message: 'Welcome to OwlEats, ' + data.email,
          duration: 3000
        }).present();
      }
    });
  }
  */

  addItem() {
    this.fbS.AddToTable('menuItems', this.newItem);
  }

  removeItem(id) {
    this.fbS.RemoveItem('menuItems', id);
  }

}
