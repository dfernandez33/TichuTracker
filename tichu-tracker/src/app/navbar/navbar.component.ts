import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth_service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authState$: Observable<firebase.User>;

  constructor(readonly authService: AuthService, readonly router: Router) {
    this.authState$ = this.authService.getAuthState();
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut()
      .then(() => {this.router.navigate(['/login'])})
      .catch(error => {console.log(error.message)});
  }

}
