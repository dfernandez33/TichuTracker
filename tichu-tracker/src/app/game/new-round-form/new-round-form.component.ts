import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { IRoundInformation, TichuType, ITeamRoundInfo } from '../../common/interfaces';
import { UserService } from '../../services/user_service/user.service';
import { DocumentData } from '../../../../node_modules/@angular/fire/firestore/interfaces';

@Component({
  selector: 'new-round-form',
  templateUrl: './new-round-form.component.html',
  styleUrls: ['./new-round-form.component.scss'],
})
export class NewRoundFormComponent {
  @Input() errorMessage = '';

  @Output() roundInformation = new EventEmitter<IRoundInformation>();

  readonly TichuType = TichuType;

  readonly newRoundForm = new FormGroup({
    team1Score: new FormControl(undefined, Validators.required),
    team1Tichu: new FormControl(TichuType.NONE),
    team1TichuUser: new FormControl(''),
    team1TichuSuccess: new FormControl(false),
    team2Score: new FormControl(undefined, Validators.required),
    team2Tichu: new FormControl(TichuType.NONE),
    team2TichuUser: new FormControl(''),
    team2TichuSuccess: new FormControl(false),
  });

  filteredUsers: DocumentData[];

  constructor(private readonly userService: UserService) { }

  addRound() {
    // this.errorMessage = '';
    // if (this.newRoundForm.get('team1Score').value +  this.newRoundForm.get('team2Score').value != 100) {
    //   this.errorMessage = 'Raw scores must add up to 100.'
    //   return;
    // }

    let roundInfo = {
      team1Info: {} as ITeamRoundInfo,
      team2Info: {} as ITeamRoundInfo
    }
    roundInfo.team1Info.teamScore = this.newRoundForm.get('team1Score').value;
    roundInfo.team2Info.teamScore = this.newRoundForm.get('team2Score').value;

    this.configureTichuInfo('team1', roundInfo.team1Info);
    this.configureTichuInfo('team2', roundInfo.team2Info);

    this.newRoundForm.reset({
      team1Score: undefined,
      team1Tichu: TichuType.NONE,
      team1TichuUser: '',
      team1TichuSuccess: false,
      team2Score: undefined,
      team2Tichu: TichuType.NONE,
      team2TichuUser: '',
      team2TichuSuccess: false,
    });
    this.roundInformation.emit(roundInfo);
  }

  resetTichu(team: string) {
    switch (team) {
      case 'team1': {
        this.newRoundForm.get('team1Tichu').setValue(TichuType.NONE);
        this.newRoundForm.get('team1TichuUser').setValue('');
        this.newRoundForm.get('team1TichuSuccess').setValue(false);
        break;
      }
      case 'team2': {
        this.newRoundForm.get('team2Tichu').setValue(TichuType.NONE);
        this.newRoundForm.get('team2TichuUser').setValue('');
        this.newRoundForm.get('team2TichuSuccess').setValue(false);
        break;
      }
    }
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

  private configureTichuInfo(team: string, roundInfo: ITeamRoundInfo) {
    switch (this.newRoundForm.get(team + 'Tichu').value) {
      case TichuType.TICHU: {
        const success = this.newRoundForm.get(team + 'TichuSuccess').value;
        roundInfo.teamScore += success ? 100 : -100;
        roundInfo.teamTichu = {
          tichuType: TichuType.TICHU, 
          user: this.newRoundForm.get(team + 'TichuUser').value, 
          success: success
        };
        break;
      }
      case TichuType.GRAND_TICHU: {
        const success = this.newRoundForm.get(team + 'TichuSuccess').value;
        roundInfo.teamScore += success ? 200 : -200;
        roundInfo.teamTichu = {
          tichuType: TichuType.GRAND_TICHU, 
          user: this.newRoundForm.get(team + 'TichuUser').value, 
          success: success
        };
        break;
      }
    }
  }

}
