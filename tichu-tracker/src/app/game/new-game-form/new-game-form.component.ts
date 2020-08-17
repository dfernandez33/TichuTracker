import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { INewGame } from '../../common/interfaces';
import { DocumentData } from '@angular/fire/firestore/interfaces';
import { UserService } from '../../services/user_service/user.service';
@Component({
  selector: 'new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.scss']
})
export class NewGameFormComponent {
  @Input() errorMessage = '';
  @Output() gameInformation = new EventEmitter<INewGame>();

  filteredUsers: DocumentData[];

  constructor(private readonly userService: UserService) { }

  readonly startGameForm = new FormGroup({
    team1_member1: new FormControl('', Validators.required),
    team1_member2: new FormControl('', Validators.required),
    team2_member1: new FormControl('', Validators.required),
    team2_member2: new FormControl('', Validators.required),
    targetScore: new FormControl(undefined, Validators.required)
  });

  startGame() {
    const controls = this.startGameForm.controls;
    const team1 = [controls['team1_member1'].value, controls['team1_member2'].value];
    const team2 = [controls['team2_member1'].value, controls['team2_member2'].value];
    const targetScore = controls['targetScore'].value;
    this.gameInformation.emit({
      team1: team1,
      team2: team2,
      targetScore: targetScore
    });
  }

  filterUsers(event) {
    const query = event.target.value;
    this.userService.filterUsers(query, 5).then(users => {
      this.filteredUsers = users.docs;
    })
  }

  clearFilter() {
    this.filteredUsers = [];
  }

}
