import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '../services/auth.service';
// import JSAlert from 'js-alert';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit{
  hide = true;
  public loginForm! : FormGroup;

  
  

  constructor(private formBuilder : FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              public dialog: MatDialog,
              public authService : AuthService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: ["", [Validators.required,Validators.email]],
      mdp: ["",[ Validators.required,Validators.minLength(2),]], 
  })
  }
  
  goToCreation(): void{
    this.authService.login(this.loginForm.value).subscribe(
      (res:any)=>{
        if(res.user){
        this.authService.currentUser = res.user 
        this.router.navigateByUrl('/creation')
        } else{
          this.dialog.open(DialogComponent);
          this.loginForm.reset()
        }
      }
    )
  }
  goToHome(): void{
    this.authService.login(this.loginForm.value).subscribe(
      (res:any)=>{
        if(res.user){
        this.authService.currentUser = res.user 
        this.router.navigateByUrl('/home')
        } else{
          this.dialog.open(DialogComponent);
          this.loginForm.reset()
        }
      }
    )
  }
}
