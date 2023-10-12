import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { getAuth, User } from 'firebase/auth';
import { AuthService } from '../Auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getLoggedInUserStatus().pipe(
      map((user) => !!user) // Convert user to a boolean (true if logged in, false if not)
    );
  }
  logout() {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Logout" in SweetAlert, proceed with logout
        this.authService.Logout().then((userCredential) => {
          console.log(userCredential);
          this.router.navigate(['/Login']);
        });
      } else {
      }
    });
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
