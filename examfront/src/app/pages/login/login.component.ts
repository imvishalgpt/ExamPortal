import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatCardModule, CommonModule, MatSnackBarModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    username: '',
    password: '',
  }

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) {



  }

  formSubmit() {
    console.log("login form submitted");

    if (this.loginData.username.trim() == '' || !this.loginData.username) {

      this.snack.open('username is required', '', {
        duration: 3000,
      });

      return;

    }
    if (this.loginData.password.trim() == '' || !this.loginData.password) {

      this.snack.open('password is required', '', {
        duration: 3000,
      });

      return;

    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("succes");
        console.log(data);



        //login...

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            //redirect....ADMIN: admin dashboard
            // redirect... NORMAL: normal dashboard

            if (this.login.getUserRole() === "ADMIN") {
              // admin dashboard
              this.router.navigate(['/admin']);
              this.login.loginStatusSubject.next(true);
            }
            else if (this.login.getUserRole() === 'NORMAL') {
              // normal user dashboard
              this.router.navigate(['/user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }
            else {
              this.login.logOut();

            }

          }
        );

      },
      (error) => {
        console.log('error!');
        console.log(error);
        this.snack.open("Inavlid Details!! Try again", '', {
          duration: 3000
        })
      }
    );
  }

}
