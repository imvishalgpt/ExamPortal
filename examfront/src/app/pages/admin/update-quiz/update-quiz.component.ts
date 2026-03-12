import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MaterialModule } from '../../../shared/material.module';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;

  quiz: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: { cid: 0 }
  };

  categories: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private categoryService: CategoryService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.qId = Number(this._route.snapshot.params['qid']);

    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
      }
    );

    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error)=>{
        alert("Error in loading categories  ")
      }
    );
  }

  updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz Updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
         Swal.fire('Error','Error in updating','error');
      }
    );
  }

}