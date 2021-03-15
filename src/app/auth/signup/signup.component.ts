import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iif } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  form: FormGroup;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'username' : new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
      'email': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'password': new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      'confirmPassword': new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    })
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("hello")
      return
    }
    console.log(this.form.value)
    const username = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const confirmPassword = this.form.value.confirmPassword;

    if(password != confirmPassword){
      console.log('Confirm Password is not same as Password');
      this.form.reset();
      return
    }

    console.log(username);
    console.log(email);
    console.log(password)
    this.authService.signup(username, email, password)

    this.form.reset();

    this.router.navigate(['/']);
  }
}
