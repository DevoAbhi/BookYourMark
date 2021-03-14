import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){}

  signup(username: string, email: string, password: string) {
    const user = {
      username: username,
      email: email,
      password: password
    }

    this.httpClient.post<{success: boolean, message: string}>('http://localhost:3000/signup', user)
    .subscribe((responseData) => {
      if(!responseData.success){
        console.log(responseData.message)
      }
      else{
        console.log(responseData.message)
      }
    })
  }
}
