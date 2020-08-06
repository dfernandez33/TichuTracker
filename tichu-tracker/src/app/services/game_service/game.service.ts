import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private readonly db: AngularFirestore) { }

  createGame() {
    return this.db.collection('games').add({});
  }
}
