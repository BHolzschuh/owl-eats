import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from '../home/home';

//class to store the attributes of table entry
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

  registerForm = this.fb.group({
    first: ['', Validators.required],
    last: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ])],
  })

  user = {} as User;
  entry = {} as Entry;
  emessage = '';
  pmessage = '';

  //constructs all necessary objects
  constructor(private afAuth: AngularFireAuth, private afData: AngularFireDatabase, private fb: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  //registers a user into the system
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        //add user id and names to database
        this.createEntry(this.user.first, this.user.last, result.uid)

        //redirect the page on success
        this.navCtrl.setRoot(HomePage)
      }
    }
    //if an error tell the user whats wrong
    catch (e) {
      console.error(e);
      this.checkErrors(e.code);
    }
  }

  //creates an entry for the userInfo table
  createEntry(first: string, last: string, uid: string) {
    this.entry.first = first;
    this.entry.last = last;
    this.entry.uid = uid;
    this.afData.list('/userInfo/').push(this.entry)
  }

  checkErrors(error: String) {
    if (error == "auth/invalid-email") {
      this.emessage = "Invalid Email Address"
      this.pmessage = '';
    }
    else if (error == "auth/weak-password") {
      this.pmessage = "Password must be at least 6 characters"
      this.emessage = '';
    }
    else if (error == "auth/argument-error") {
      this.emessage = "Please fill out all fields"
      this.pmessage = '';
    }
  }

  validation_messages = {
    'first': [
      { type: 'required', message: 'First name is required' },
    ],
    'last': [
      { type: 'required', message: 'Last name is required' },
    ],
    'email': [
      { type: 'required', message: 'Email address is required' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters' },
      { type: 'pattern', message: 'Password must contain 1 upper & lowercase letter & 1 number' },
    ],
  }

}
