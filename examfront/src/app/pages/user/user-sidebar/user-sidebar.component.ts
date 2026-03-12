import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { RouterOutlet } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterOutlet  ],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit{
  categories: any;

  constructor(private _cat: CategoryService, private _snack: MatSnackBar){}

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;

      },
      (error)=>{
          this._snack.open("Error in loading categories from server",'',{
            duration:3000,
          })
      }
    )
    
  }

}
