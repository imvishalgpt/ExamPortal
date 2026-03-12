import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';

import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn= false;
  user: any =null;

  constructor(public login:LoginService)
  {

  }

  ngOnInit(): void {

    this.isLoggedIn= this.login.isLoggedIn();
    this.user= this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
       this.isLoggedIn= this.login.isLoggedIn();
    this.user= this.login.getUser();
    });
    
  }
  public logout()
  {
    this.login.logOut();
    
    window.location.reload();
  }

}
