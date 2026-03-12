import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { RouterOutlet } from '@angular/router';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, UserSidebarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
