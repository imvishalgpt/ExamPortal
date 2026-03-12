import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';

import Swal from 'sweetalert2'
import { MaterialModule } from '../../shared/material.module';





@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule,MatInputModule,FormsModule, CommonModule, HttpClientModule, MatCardModule, MaterialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private userService:UserService, private snack:MatSnackBar){}

  public user={
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone:'',
    enabled: true,
  };

  formSubmit()
  {
    console.log(this.user);
    if(!this.user.username || this.user.username.trim() == ''){
      // alert('username is required!!');
      this.snack.open("Username is required !!"
      ,' ',{
        duration: 3000,
      });
      return;
    }

    // addUser: user serice
    this.userService.addUser(this.user).subscribe(
  (data)=>{
    console.log(data)
    Swal.fire('Success','User is registered!','success');
    this.user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    enabled: true
  };
  },
  (error)=>{
    console.log(error);

    let message = '';

    if(error.error instanceof Object){
      message = error.error.message || 'User already exists';
    } else {
      message = error.error;
    }

    this.snack.open(message, '', {
      duration: 3000,
    });
  }
);
  }

}
