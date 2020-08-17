import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly db: AngularFirestore) { }

  filterUsers(query: string, limit: number) {
    return this.db.collection('users').ref.orderBy('username').startAt(query).endAt(query + '\uf8ff')
    .limit(limit).get();
  }
}
