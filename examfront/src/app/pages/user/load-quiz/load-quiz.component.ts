import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';   // ⭐ ADD THIS

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [MaterialModule, CommonModule],  // ⭐ ADD HERE
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizzes: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
  ) {}

  ngOnInit(): void {

    this._route.paramMap.subscribe(params => {

      this.catId = params.get('catId');

      if (this.catId == '0') {

        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.quizzes = data;
          },
          (error)=>{
            Swal.fire('Error','Error in loading data from server','error');
          }
        );

      } else {

        console.log("specific quizzes loaded");

        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes = data;
          },
          (error)=>{
            Swal.fire('Error','Error loading quizzes','error');
          }
        );

      }

    });

  }

}