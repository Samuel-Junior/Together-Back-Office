import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
    private BACK_URL = 'https://together-back.vercel.app';
    constructor(private http : HttpClient) { }
  }