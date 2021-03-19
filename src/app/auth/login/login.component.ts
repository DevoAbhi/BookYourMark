import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'password': new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    })
  }

  onLogin(){
    if(this.form.invalid){
      return
    }

    this.authService.loginReqObj = {}
    this.authService.loginReqObj.email = this.form.value.email;
    this.authService.loginReqObj.password = this.form.value.password;
    this.authService.login()

    // this.form.reset();

    // this.router.navigate(['/']);
  }
}
