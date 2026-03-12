import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [...MaterialModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any[]=[ 
   
    


  ];

  constructor(private _quiz:QuizService){}

  ngOnInit(): void{
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!',"Errorin loading data!",'error');
        
      }
    );
  }
  deleteQuiz(qId: any){
    Swal.fire({
      icon: 'warning',
      title:"Are you sure?",
      confirmButtonText: 'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
      (data)=>{
        this.quizzes= this.quizzes.filter((quiz)=>quiz.qId!=qId)
        Swal.fire('success','Successfully Deleted','success');
      },
      (error)=>{
        Swal.fire('error','Error in Deleting quiz','error');

      }
    );
      }
    })
  }

}


