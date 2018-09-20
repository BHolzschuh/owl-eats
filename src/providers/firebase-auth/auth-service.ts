import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from '../../models/user';

@Injectable()
export class AuthServiceProvider {

  constructor(private afAuth: AngularFireAuth) { }

  async loginUser(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      console.log(result);
      if (result) {
        return true;
      }

    }
    catch (e) {
      console.error(e);
      return false;
    }
  }
}