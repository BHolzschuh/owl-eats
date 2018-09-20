import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

//page imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

//service imports
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { AuthServiceProvider } from '../providers/firebase-auth/auth-service';

//firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//firebase config import
import { FIREBASE_CONFIG } from './app.firebase.config';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,

    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),

    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule { }
