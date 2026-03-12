import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { Category, CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [...MaterialModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent {

  categories: Category[] = [];

  constructor(private _category:CategoryService){}

  ngOnInit():void{
      this._category.categories().subscribe((data:any)=>{
        //css
        this.categories=data;
        console.log(this.categories);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!!", "Error in loading data",'error')
        
      }
    )
  }
  deleteCategory(cid: any): void {
    Swal.fire({
      title: 'Delete Category?',
      text: 'This category and all its quizzes will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e8245e',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(cid).subscribe(
          () => {
            this.categories = this.categories.filter((c: any) => c.cid !== cid);
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error!!', 'Error deleting category', 'error');
          }
        );
      }
    });
  }
}
