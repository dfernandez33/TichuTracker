import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly auth: AngularFireAuth, private readonly db: AngularFirestore) { }

  public loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        throw error;
      })
  }

  public registerUser(username: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(async res => 
        {
          this.addUserToDB(email, username).catch(error => {throw error});
        })
      .catch(error => {throw error;});
  }

  public getCurrentUser() {
    return this.auth.currentUser;
  }

  public getAuthState() {
    return this.auth.authState;
  }

  public signOut() {
    return this.auth.signOut();
  }

  private addUserToDB(email: string, username: string) {
    return this.db.collection('users').add({
      username: username,
      email: email
    }).catch(error => {throw error});
  }
}
