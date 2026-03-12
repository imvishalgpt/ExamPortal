import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  standalone: true,
  imports: [...MaterialModule,RouterModule],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent implements OnInit{
  category={
    title:'',
    description:'',
  }
  constructor(private _category:CategoryService, private _snack:MatSnackBar){}
  ngOnInit(): void {
    
  }

  formSubmit()
  {
    if(this.category.title.trim()==''|| this.category.title==null)
    { 
      this._snack.open("Title Required!!",'',{
        duration:3000
      })
      return;
    }
    // all done
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("success!!",'Category is add successfully','success');
      },
      (error)=>{
        console.log(error );
         Swal.fire("Error!!",'Server Error','error');
        
      }
    )
  }

}
