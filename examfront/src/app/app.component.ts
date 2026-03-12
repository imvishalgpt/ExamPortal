import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './shared/material.module';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule ,POSITION, SPINNER } from 'ngx-ui-loader';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, NavbarComponent, FooterComponent,SignupComponent,LoginComponent, NgxUiLoaderHttpModule, NgxUiLoaderModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'examfront';
}
