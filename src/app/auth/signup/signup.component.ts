import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  form: FormGroup;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'username' : new FormControl(null, {validators})
    })
  }

  onSubmit(){}
}
