import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createPostForm! : FormGroup
  createPostPreview$!: Observable<PostService>;

  constructor( private formBuilder: FormBuilder,
               private router : Router, 
               public postService:PostService ){}

  ngOnInit(): void {
    this.createPostForm= this.formBuilder.group({
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required,]],

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
