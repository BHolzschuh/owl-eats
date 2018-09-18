import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  menuItems: FirebaseListObservable<any[]>;
  newItem = '';

  constructor(public navCtrl: NavController, public firebaseService: FirebaseServiceProvider) {
    this.menuItems = this.firebaseService.getMenuItems();
  }

  addItem(){
    this.firebaseService.addItem(this.newItem);
  }

  removeItem(id){
    this.firebaseService.removeItem(id);
  }

}
