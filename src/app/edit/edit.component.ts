import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editPostForm! : FormGroup
  createPostPreview$!: Observable<PostService>;
  post! : Post


  constructor(private formBuilder: FormBuilder,
              private route : ActivatedRoute,
              private router : Router,
              public postService: PostService ){ }
  ngOnInit(): void {


    const postId = this.route.snapshot.params['id'];
    
    this.postService.getPostById(postId).subscribe(
  
    (response:any)=>{
     this.post = response.response
      this.editPostForm= this.formBuilder.group({
        description: [this.post.description, Validators.required],
        imageUrl: [this.post.imageUrl, [Validators.required,]],
        
      },{
        // updateOn: "blur"
      });
    }
    )
      
    
  }

  onSubmit(id?: string): void {
    if(this.editPostForm.valid){
      const newPost = {...this.post, ...this.editPostForm.value}
      this.postService.edit(id, newPost).subscribe(()=>{
        this.router.navigateByUrl('/home')
      })
    }
    
  }

}
