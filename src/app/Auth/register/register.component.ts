import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  emailVerified = '';
  verificationMessage = '';
  error = '';
  constructor(private authService: AuthService, private router: Router) {}

  RegisterFirebase(RegisterForm: NgForm) {
    const email = RegisterForm.value.email;
    const pass = RegisterForm.value.pass;
    const phoneNumber = RegisterForm.value.num;
    const userName = RegisterForm.value.username;
    const userGender = RegisterForm.value.gender;
    const userData = {
      Email: email,
      Password: pass,
      PhoneNumber: phoneNumber,
      UserName: userName,
      UserGender: userGender,
    };
    this.authService
      .Register(email, pass, userGender, phoneNumber, userName)
      .then(() => {
        this.router.navigate(['/Login']);
        Swal.fire({
          icon: 'success',
          title: 'Registration Success',
          text: 'A verification email has been sent. Please check your inbox.',
        });
        RegisterForm.reset();
      })
      .catch((error) => {
        switch (error.message) {
          case 'Firebase: Error (auth/email-already-in-use).':
            this.error = 'This Email is already exist';
        }
        Swal.fire({
          icon: 'error',
          title: 'Email Registration Error',
          text: this.error,
        });
      });
  }
}
