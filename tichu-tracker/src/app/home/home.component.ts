import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser$: Promise<firebase.User>;

  constructor(private readonly authService: AuthService) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
