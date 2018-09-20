import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class FirebaseServiceProvider {

  constructor(public afd: AngularFireDatabase) {
    console.log('yo waddup im a database');
  }



  getMenuItems() {
    return this.afd.list('/menuItems/');

  }

  addItem(name) {
    return this.afd.list('/menuItems/').push(name);

  }

  removeItem(id) {
    return this.afd.list('/menuItems/').remove(id);

  }


}
