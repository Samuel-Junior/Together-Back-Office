import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
    private BACK_URL = environment.apiUrl;
    constructor(private http : HttpClient) { }
  }