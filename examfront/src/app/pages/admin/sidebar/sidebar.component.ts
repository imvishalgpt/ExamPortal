import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  isOpen = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe(val => {
      this.isOpen = val;
    });
  }

  closeSidebar() {
    this.sidebarService.close();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}