import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MaterialModule } from '../../shared/material.module';
import { SidebarService } from '../../services/sidebar.service';
import { ViewEncapsulation } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: any = null;

  constructor(public login: LoginService, private sidebarService: SidebarService, public router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  public logout() {
    this.login.logOut();
    window.location.reload();
  }
}