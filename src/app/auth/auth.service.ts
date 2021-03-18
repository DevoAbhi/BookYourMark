import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string;
  private isAuthStatusListener= new Subject<boolean>();

  constructor(
    private httpClient: HttpClient
  ){
  }

  getToken() {
    return this.token
  }

  getAuthStatusListener() {
    return this.isAuthStatusListener.asObservable();
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
    .subscribe( responseData => {

      const token = responseData.token;
      this.token = token;
      this.isAuthStatusListener.next(true);
    })
  }
}
