import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';
import { GameService } from '../services/game_service/game.service';
import { INewGame, IRoundInformation } from '../common/interfaces';
import { MatSnackBar } from '../../../node_modules/@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  readonly gameId;
  routingQueryParameters$: Observable<ParamMap>;

  startGameError = '';
  roundError = '';

  targetScore = 0;

  team1: string[];
  team1Score = 0;

  team2: string[];
  team2Score = 0;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router, 
    private readonly gameService: GameService, private readonly snackBar: MatSnackBar) {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('gameId');
    this.routingQueryParameters$ = this.activatedRoute.queryParamMap;
  }

  ngOnInit(): void {
  }

  startGame(gameInformation: INewGame) {
    this.targetScore = gameInformation.targetScore;
    this.team1 = gameInformation.team1;
    this.team2 = gameInformation.team2
    this.gameService.updateMembers(this.gameId, gameInformation)
    .then(() => {
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: { mode: 'new_round' },
        }); 
    })
    .catch(error => {this.startGameError = error.message});
  }

  addRound(roundInformation: IRoundInformation) {
    this.team1Score += roundInformation.team1Info.teamScore;
    this.team2Score += roundInformation.team2Info.teamScore;
    if (this.team1Score >= this.targetScore || this.team2Score >= this.targetScore) {
      let winner: string[];
      let loser: string[];
      if (this.team1Score >= this.targetScore) {
        winner = this.team1;
        loser = this.team2
      } else {
        winner = this.team2;
        loser = this.team1;
      }
      this.gameService.finishGame(this.gameId, roundInformation, winner, loser)
      .then(() => {
        this.snackBar.open('Round Recorded!', 'X', {
          duration: 2000
        });
        this.router.navigate(
          [], 
          {
            relativeTo: this.activatedRoute,
            queryParams: { mode: 'done', winner: JSON.stringify(winner) },
          }); 
      })
      .catch(error => {this.roundError = error.message});
    } else {
      this.gameService.addRound(this.gameId, roundInformation)
      .then(() => {
        this.snackBar.open('Round Recorded!', 'X', {
          duration: 2000
        });
        this.router.navigate(
          [], 
          {
            relativeTo: this.activatedRoute,
            queryParams: { mode: 'new_round' },
          }); 
      })
      .catch(error => {this.roundError = error.message});
    }
  }

  parseWinner(winners) {
    return JSON.parse(winners);
  }
  
  newGame() {
    this.gameService.createGame().then(gameRef => {this.router.navigate(['/game', gameRef.id], { queryParams: { mode: 'create' }})});
  }
}
