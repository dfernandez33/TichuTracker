import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

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
          await this.addUserToDB(res.user, username).catch(error => {throw error});
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

  private async addUserToDB(user: firebase.User, username: string) {
    try {
      await user.updateProfile({displayName: username});
      await this.db.collection('users').add({
        username: username,
        gamesPlayed: 0,
        wins: 0,
        tichuCount: 0,
        tichuWins: 0,
        games: []
      }).catch(error => {throw error});
    } catch(e) {
      throw e;
    }
  }
}
