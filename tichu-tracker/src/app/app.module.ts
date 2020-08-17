import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { GameModule } from './game/game.module';
import { NewGameFormModule } from './game/new-game-form/new-game-form.module';
import { NewRoundFormModule } from './game/new-round-form/new-round-form.module';

const firebaseConfig = {
  apiKey: "AIzaSyBH3o5xBWtzYrFuJXvzNAGIO9GbXuitOD0",
  authDomain: "tichu-tracker-beec0.firebaseapp.com",
  databaseURL: "https://tichu-tracker-beec0.firebaseio.com",
  projectId: "tichu-tracker-beec0",
  storageBucket: "tichu-tracker-beec0.appspot.com",
  messagingSenderId: "35376810691",
  appId: "1:35376810691:web:51aedb339e41dc76c97076",
  measurementId: "G-58Y821VBHQ"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    LoginModule,
    RegistrationModule,
    HomeModule,
    NavbarModule,
    GameModule,
    NewGameFormModule,
    NewRoundFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
