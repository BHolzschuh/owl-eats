import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseServiceProvider {

  constructor(public db: AngularFireDatabase) {
    console.log('yo waddup im a database');
  }

  getSepcific(table, key, value) {
    return this.db.list(table, {
      query: {
        orderByChild: key,
        equalTo: value
      }
    })
  }

  getMenuItems() {
    return this.db.list('/menuItems/');

  }

  addItem(name) {
    return this.db.list('/menuItems/').push(name);

  }

  removeItem(id) {
    return this.db.list('/menuItems/').remove(id);

  }


}
