import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseServiceProvider {

  constructor(public db: AngularFireDatabase) {
    console.log('yo waddup im a database');
  }

  QueryTable(table, key, value) {
    return this.db.list(table, {
      query: {
        orderByChild: key,
        equalTo: value
      }
    })
  }

  GetTable(table) {
    return this.db.list(table);
  }

  AddToTable(table, data) {
    return this.db.list(table).push(data);
  }

  RemoveItem(table, id) {
    return this.db.list(table).remove(id);
  }


}
