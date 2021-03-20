import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  isAuthSub: Subscription;


  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.isUserAuthenticated = this.authService.isUserLoggedIn();
    this.isAuthSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.isUserAuthenticated = isAuth;
      });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();

  }
}
