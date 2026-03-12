import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [...MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
user: any = null;
  constructor(private login:LoginService){}

  ngOnInit():void{

    this.user =this.login.getUser(); 

    // this is to get the data from the local storage
    // this.login.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user=user;
    //   },
    //   (error)=>{
    //     alert('error');
    //   }
    // )
  }

}
