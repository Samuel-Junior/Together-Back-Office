import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

  export class UsersService {
    
    private BACK_URL = 'http://localhost:3000';
    
    constructor(private http : HttpClient) { }

    
    
  }