import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewGameFormModule } from './new-game-form/new-game-form.module';
import { NewRoundFormModule } from './new-round-form/new-round-form.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    NewGameFormModule,
    NewRoundFormModule
  ],
  exports: [GameComponent]
})
export class GameModule { }
