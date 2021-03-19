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
    console.log(this.authService.getIsAuthenticated())
    console.log("Hello madharchod bsdk")
    // this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.isAuthSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.isUserAuthenticated = isAuth;
      });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();

  }
}
