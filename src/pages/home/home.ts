import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  menuItems: FirebaseListObservable<any[]>;
  newItem = '';

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public firebaseService: FirebaseServiceProvider) {
    this.menuItems = this.firebaseService.getMenuItems();
  }

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

  addItem() {
    this.firebaseService.addItem(this.newItem);
  }

  removeItem(id) {
    this.firebaseService.removeItem(id);
  }

}
