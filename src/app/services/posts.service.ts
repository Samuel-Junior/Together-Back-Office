import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";


@Injectable({
    providedIn: 'root'
  })

  export class PostService {

    private BACK_URL = 'http://localhost:3000';
    
    constructor(private http : HttpClient) { }

    getPosts():Observable<any>{
        return this.http.get(this.BACK_URL+'/api/post') as Observable<any>
      }
    createPost(post: Post):Observable<Post>{
      return this.http.post(this.BACK_URL+'/api/post', post) as Observable<Post>
    }
    getPostById(id:number):any {
      return this.http.get(this.BACK_URL+'/api/post/'+id) as Observable<any>
    }
    edit(id?:string, post?:Post):Observable<any> {
      return this.http.put(this.BACK_URL+'/api/post/'+id,post) as Observable<any>
    } 
    delete(id : string): Observable<{succes:string}> {
      return this.http.delete(this.BACK_URL+'/api/post/'+id) as Observable<{succes:string}>
    }
    liked(id:any,post :any){
      return this.http.put(this.BACK_URL+'/api/post/like/'+id,post) as Observable<any>
    }
  }