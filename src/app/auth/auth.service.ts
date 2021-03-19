import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string = '';
  private isAuthStatusListener= new Subject<boolean>();
  loginReqObj;
  loginResObj;

  constructor(
    private httpClient: HttpClient
  ){
  }



  getIsAuthenticated() {
    console.log(this.isAuthenticated)
    return this.isAuthenticated;
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

    login(){
    const user: User= {
      username: null,
      email: this.loginReqObj.email,
      password: this.loginReqObj.password
    }

    this.httpClient.post<{token: string}>('http://localhost:3000/login', user)
    .subscribe(
      response => {

        this.loginResObj = response;
        const token =  response.token;
        this.token = token;
      if(token){
        this.isAuthenticated = true;
        console.log(this.isAuthenticated)
        this.isAuthStatusListener.next(true);
      }

    })
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.isAuthStatusListener.next(false);
  }

  // async getLoginResponseData(email: string, password: string){
  //   let response = await this.login(email, password).toPromise();
  //   if(response){
  //     console.log(response.token)
  //     this.token = response.token
  //     console.log("Main hu 1st madharchod !")
  //     this.isAuthenticated = true
  //   }
  //   console.log(typeof this.token)
  //   return response.token
  // }

  // async loginProceed(email: string, password: string){
  //   let token = await this.getLoginResponseData(email, password);

  //   this.token = token;
  //   console.log(this.token)
  //   return token;
  // }

  getToken() {
    console.log(this.token)
    console.log(this.isAuthenticated)
    return this.token
  }


}
