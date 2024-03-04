import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { map, of, timer } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
  })

  // Fonction about my authentification.
  export class AuthService {

    private BACK_URL = environment.apiUrl
    public currentUser?: User

    constructor(private http : HttpClient){}

  
    logout() {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  
    isAuthenticated(): boolean {
      return !!this.getToken()
    }

    login(user: any) {
      return this.http.post(this.BACK_URL+'/api/user/authenticate',user).pipe(
        map((response:any) =>{
          localStorage.setItem("accessToken",response.accessToken)
          localStorage.setItem("refreshToken",response.refreshToken)
          return response
        })
      )
   }
   createUser(user: any){
    return this.http.post(this.BACK_URL+'/api/user/',user)
   }

   getToken(){
    return localStorage.getItem("accessToken")
   }
  }