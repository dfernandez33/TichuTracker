import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AuthService } from '../services/auth_service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly signInForm =  new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  hidePassword = true;
  errorMessage = '';

  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  async login() {
    const email =  this.signInForm.controls['email'];
    const password = this.signInForm.controls['password'];
    this.authService.loginUser(email.value, password.value)
      .then(res => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      })
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

}
