import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AuthService } from '../services/auth_service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  readonly registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  hidePassword = true;
  errorMessage = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  registerUser() {
    const username = this.registrationForm.controls['username'].value;
    const password = this.registrationForm.controls['password'].value;
    const email = this.registrationForm.controls['email'].value;
    this.authService.registerUser(username, email, password)
      .then(res => {this.router.navigate(['/home'])})
      .catch(error => {this.errorMessage = error.message});
  }

}
