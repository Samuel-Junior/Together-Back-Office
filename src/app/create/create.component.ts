import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/posts.service';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createPostForm! : FormGroup
  createPostPreview$!: Observable<PostService>;


  constructor(private formBuilder: FormBuilder,
    private router : Router, public postService:PostService ){ }
  ngOnInit(): void {
    this.createPostForm= this.formBuilder.group({
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required,]],

    },{
      // updateOn: "blur"
    });
    
    
  }

  submitPost(post : Post){
  if(this.createPostForm.valid){
    const newPost = {...post, ...this.createPostForm.value}
    this.postService.createPost(newPost).subscribe(()=>{
      this.router.navigateByUrl('/home')
    })
  }
  }
}
// if(this.editPostForm.valid){
//   const newPost = {...this.post, ...this.editPostForm.value}
//   this.postService.edit(id, newPost).subscribe(()=>{
//     this.router.navigateByUrl('/home')
//   })
// }


// this.postService.createPost(post).subscribe(
    //   (res)=>{
    //     console.log(res);
    //     this.router.navigateByUrl("/home")
    //   },
    //   (e)=>{
    //     console.log(e);
    //   }
    // )