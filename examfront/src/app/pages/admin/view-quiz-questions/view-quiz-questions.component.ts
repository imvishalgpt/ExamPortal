import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: number = 0;
  qTitle: any;

  questions: any[]=[];

  constructor(private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar,
  ) {}

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];   
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        console.log('First question answer:', data[0]?.answer);  // add this
  console.log('First question options:', data[0]?.option1, data[0]?.option2, data[0]?.option3, data[0]?.option4);
  
        this.questions=data;
        
      },
      (error)=>{
        console.log("Error");
        
      }
    )

   

  }
  deleteQuestion(qid:any){
  Swal.fire({
    title: 'Delete Question?',
    text: 'This question will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Delete'
  }).then((result)=>{

    if(result.isConfirmed){

      this._question.deleteQuestion(qid).subscribe(
        (data:any)=>{
          this._snack.open('Question Deleted','',{
            duration:3000
          });
          this.questions= this.questions.filter((q)=>q.quesId!=qid)
        },
        (error)=>{
          Swal.fire('Error','Error deleting question','error');
        }
      )

    }

  });

}
}