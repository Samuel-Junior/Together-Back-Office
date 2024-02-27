import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogvalidateComponent } from '../dialogvalidate/dialogvalidate.component';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
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
        role: ["utilisateur", [Validators.required,]],
        nom: ["", [Validators.required,]],
        prenom: ["", [Validators.required,]],
        departement: ["", [Validators.required,]],
        mail: ["", [Validators.required,Validators.email]],
        mdp: ["",[ Validators.required,Validators.minLength(3),]], 
    })
    }

    CreatedUser(): void{
      this.authService.createUser(this.loginForm.value).subscribe(
        (res:any)=>{
          this.dialog.open(DialogvalidateComponent);
          this.loginForm.reset()
        }
      )
    }
}
