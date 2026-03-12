import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { Category, CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {

  categories: any[] = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: ''
    }
  }


  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService) { };
  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data: any) => {
        //categories load successfully
        this.categories = data;
        // console.log(this.categories);

      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'error in loading data from server', 'error');

      }
    )
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open("Title Required!!", '', {
        duration: 3000
      });
      return;
    }
    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'Quiz is added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: ''
          }
        }

      },
      (error)=>{
        Swal.fire('Error!!','Error while adding quiz','error')
      }
    );
    
  }


}
