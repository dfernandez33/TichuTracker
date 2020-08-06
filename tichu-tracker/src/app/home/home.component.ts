import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth_service/auth.service';
import { GameService } from '../services/game_service/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser$: Promise<firebase.User>;

  constructor(private readonly authService: AuthService, private readonly gameService: GameService, private readonly router: Router) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
  }

  newGame() {
    this.gameService.createGame().then(gameRef => {this.router.navigate(['/game', gameRef.id], { queryParams: { mode: 'create' }})});
  }

}
