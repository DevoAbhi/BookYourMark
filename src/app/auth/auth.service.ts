import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){
  }

  async getToken() {
    return await this.token;
  }

  signup(username: string, email: string, password: string) {
    const user: User = {
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

  login(email: string, password: string){
    const user: User= {
      username: null,
      email: email,
      password: password
    }

    this.httpClient.post<{token: string}>('http://localhost:3000/login', user)
    .subscribe((responseData) => {

      const auth_token = responseData.token;
      this.token =  auth_token;
      console.log(this.token)
    })
    console.log(this.token)
  }

}
