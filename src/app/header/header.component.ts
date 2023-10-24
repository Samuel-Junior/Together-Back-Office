import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit  {

  public initial :string | undefined
  public nom :string | undefined
  public prenom :string | undefined

  constructor(private routes : ActivatedRoute,
              private router : Router,
              private authService : AuthService){}

  ngOnInit(): void {
     this.prenom = this.authService.currentUser?.prenom?.substring(0,1)
     this.nom = this.authService.currentUser?.nom?.substring(0,1);
     this.initial =`${this.prenom}${this.nom}`
     
  }
  goToCreate(){
    this.router.navigateByUrl('/create')
  }
  goToHome(){
    this.router.navigateByUrl('/home')
  }
  logout(){
    this.authService.logout()
    this.router.navigateByUrl('')
  }
}
