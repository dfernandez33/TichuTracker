import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from '../../../../node_modules/firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly db: AngularFirestore) { }

  filterUsers(query: string, limit: number) {
    return this.db.collection('users').ref.orderBy('username').startAt(query).endAt(query + '\uf8ff')
    .limit(limit).get();
  }

  async addGameToUserRecords(gameId: string, winners: string[], losers: string[]) {
    const batch = this.db.firestore.batch();
    for (let username of winners) {
      const query = await this.db.collection('users').ref.where('username', '==', username).get();
      if (!query.empty) {
        const userRef = query.docs[0].ref;
        batch.update(userRef, {
          gamesPlayed: firestore.FieldValue.increment(1),
          wins: firestore.FieldValue.increment(1),
          games: firestore.FieldValue.arrayUnion(gameId)
        })
      }
    }

    for (let username of losers) {
      const query = await this.db.collection('users').ref.where('username', '==', username).get();
      if (!query.empty) {
        const userRef = query.docs[0].ref;
        batch.update(userRef, {
          gamesPlayed: firestore.FieldValue.increment(1),
          games: firestore.FieldValue.arrayUnion(gameId)
        })
      }
    }

    return batch.commit();
  }
}
