import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { INewGame, IRoundInformation, TichuType } from '../../common/interfaces';
import { firestore } from '../../../../node_modules/firebase';
import { UserService } from '../user_service/user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private readonly db: AngularFirestore, private readonly userService: UserService) { }

  createGame() {
    return this.db.collection('games').add({
      done: false,
      startTime: Date.now()
    });
  }

  updateMembers(gameId: string, gameInformation: INewGame) {
    return this.db.collection('games').doc(gameId).update({
      participants: gameInformation.team1.concat(gameInformation.team2),
      targetScore: gameInformation.targetScore
    }).catch(e => {throw e});
  }

  async addRound(gameId: string, roundInformation: IRoundInformation) {
    let batch = this.db.firestore.batch();
    let gamesRef = this.db.collection('games').doc(gameId).ref;
    batch.update(gamesRef, {
      rounds: firestore.FieldValue.arrayUnion({
        team1: roundInformation.team1Info.teamScore,
        team2: roundInformation.team2Info.teamScore
      })
    })
    await this.updateUserTichuRecords(batch, roundInformation);
    return batch.commit();
  }

  async finishGame(gameId: string, roundInformation: IRoundInformation, winner: string[], loser: string[]) {
    let batch = this.db.firestore.batch();
    let gamesRef = this.db.collection('games').doc(gameId).ref;
    batch.update(gamesRef, {
      done: true,
      winner: winner,
      loser: loser,
      rounds: firestore.FieldValue.arrayUnion({
        team1: roundInformation.team1Info.teamScore,
        team2: roundInformation.team2Info.teamScore
      })
    });
    await this.updateUserTichuRecords(batch, roundInformation);
    await this.userService.addGameToUserRecords(gameId, winner, loser);
    return batch.commit();
  }

  private async updateUserTichuRecords(batch: firestore.WriteBatch, roundInformation: IRoundInformation) {
    if (roundInformation.team1Info.teamTichu) {
      const tichu = roundInformation.team1Info.teamTichu
      const results = await this.db.collection('users').ref.where('username', '==', tichu.user).get();
      const userRef = results.docs[0].ref;
      switch (tichu.tichuType) {
        case TichuType.TICHU: {
          batch.update(userRef, {
            tichuWins: firestore.FieldValue.increment(tichu.success ? 1 : 0),
            tichuCount: firestore.FieldValue.increment(1)
          })
          break;
        }
        case TichuType.GRAND_TICHU: {
          batch.update(userRef, {
            grandTichuWins: firestore.FieldValue.increment(tichu.success ? 1 : 0),
            grandTichuCount: firestore.FieldValue.increment(1)
          })
          break;
        }
      }
    }
    if (roundInformation.team2Info.teamTichu) {
      const tichu = roundInformation.team2Info.teamTichu
      const results = await this.db.collection('users').ref.where('username', '==', tichu.user).get();
      const userRef = results.docs[0].ref;
      switch (tichu.tichuType) {
        case TichuType.TICHU: {
          batch.update(userRef, {
            tichuWins: firestore.FieldValue.increment(tichu.success ? 1 : 0),
            tichuCount: firestore.FieldValue.increment(1)
          })
          break;
        }
        case TichuType.GRAND_TICHU: {
          batch.update(userRef, {
            grandTichuWins: firestore.FieldValue.increment(tichu.success ? 1 : 0),
            grandTichuCount: firestore.FieldValue.increment(1)
          })
          break;
        }
      }
    }
  }
}
