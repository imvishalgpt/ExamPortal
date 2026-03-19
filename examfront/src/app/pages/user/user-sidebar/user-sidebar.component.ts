import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewEncapsulation } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UserSidebarComponent implements OnInit {

  categories: any;
  isOpen = false;

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    // Listen to navbar hamburger clicks
    this.sidebarService.isOpen$.subscribe(val => {
      this.isOpen = val;
    });

    this._cat.categories().subscribe(
      (data: any) => { this.categories = data; },
      (error) => {
        this._snack.open('Error in loading categories', '', { duration: 3000 });
      }
    );
  }

  closeSidebar() {
    this.sidebarService.close();
  }
}