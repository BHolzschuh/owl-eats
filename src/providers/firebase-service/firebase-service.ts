import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


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

  getSpecificMenu() {
    return this.afd.list('/userInfo/', {
      query: {
        orderByChild: 'first',
        eqalTo: 'brian',
      }
    });
  }


}
