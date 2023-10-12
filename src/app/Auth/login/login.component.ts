import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  LoginwithGmail() {
    this.authService.loginwithGmail().then((user) => {
      console.log(user);
      this.router.navigate(['/Proucts']);
    });
  }
  LoginwithFacebook() {
    this.authService.LoginWithFacebook().then((user) => {
      console.log(user);
    });
  }
  signIN(LoginForm: NgForm) {
    let email = LoginForm.value.email;
    let pass = LoginForm.value.pass;
    this.authService.Login(email, pass).then((userCredential) => {
      console.log(userCredential);
      this.router.navigate(['/Products']);
      swal.fire({
        icon: 'success',
        title: 'Login Success!',
      });
    });
  }
}
