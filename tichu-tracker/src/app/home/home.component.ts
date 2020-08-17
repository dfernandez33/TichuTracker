import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth_service/auth.service';
import { GameService } from '../services/game_service/game.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore/interfaces';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  currentUser$: Promise<firebase.User>;

  constructor(private readonly authService: AuthService, private readonly gameService: GameService,
    private readonly router: Router) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  newGame() {
    this.gameService.createGame().then(gameRef => {this.router.navigate(['/game', gameRef.id], { queryParams: { mode: 'create' }})});
  }

}
