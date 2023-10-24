import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../models/post.model';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
 colorControl = new FormControl('primary' as ThemePalette);
 postTab: any[] = []
 seeMyPost = false
 libelle = 'Voir mes posts'
 button = "Like"
 currentUser : User | undefined 
 public post!: Post
 public user!: User
 public initial :string | undefined
 public nom :string | undefined
 public prenom :string | undefined
 
  constructor(private postService : PostService,
              private router : Router,
              private route : ActivatedRoute,
              public dialog: MatDialog, 
              public cd:ChangeDetectorRef,
              public authService : AuthService,){}

    ngOnInit(): void {
      this.currentUser =  this.authService.currentUser
      this.prenom = this.authService.currentUser?.prenom?.substring(0,1)
      this.nom = this.authService.currentUser?.nom?.substring(0,1);
      this.initial =`${this.prenom}${this.nom}`
      this.postService.getPosts().subscribe(
        (res: any)=>{
          this.postTab = res.response as [];
          this.postTab.reverse()
          console.log(res);
        },
        (err)=>{
          alert("erreur")
        })
    }

    goToEdit(id: any): void{
      this.router.navigateByUrl( `/edit/${id}`)
    }

    delete(id:string):void{
      this.postService.delete(id)
      .subscribe(()=>{
        this.cd.markForCheck()
        this.postTab = this.postTab.filter(el => el._id !== id)
      })
    }

    trier(){
      this.seeMyPost = !this.seeMyPost

      if(this.seeMyPost) {
        this.postTab = this.postTab.filter((post)=>{
        return  post.author._id === this.authService.currentUser?._id
      })
      this.libelle = 'Voir tous les posts'
      } else {
        this.postService.getPosts().subscribe(
          (res: any)=>{
            this.postTab = res.response as [];
            console.log(res);
          },
          (err)=>{
            alert("erreur")
          }
        )
        this.libelle = 'Voir mes posts'
      }
    }

    goToCreate(){
      this.router.navigateByUrl('/create')
    }
    
    displayBtn(post:Post){
      if(this.authService.currentUser?._id === post.author?._id || this.authService.currentUser?.role === "admin"){
        return true
      }else{
       return false
      }
    }

    like(id: any, post: any){
      this.postService.liked(id,post).subscribe(
        (res) =>{
          this.postTab.splice(this.postTab.findIndex((post)=> res._id === post._id), 1,res)
          this.postTab = this.postTab.slice()

          console.log(this.postTab);
          
        },
        (err) => {
          console.log(err)
        })
    }
}
