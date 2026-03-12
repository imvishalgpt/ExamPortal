import { Component, OnInit } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { QuestionService } from '../../../services/question.service';
import { ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any[] = [];
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timeLeft: number = 0;
  totalTime: number = 0;
  timer: any;
  progressValue: number = 100;


  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestion();
  }

  loadQuestion() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.totalTime = this.questions.length * 2 * 60;
        this.timeLeft = this.totalTime;
        this.startTimer();
      },
      (error) => {
        Swal.fire('Error', 'Error in loading Questions', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => history.pushState(null, '', location.href));
  }

  getAnsweredCount(): number {
    return this.questions.filter(q => q.givenAnswers && q.givenAnswers.trim() !== '').length || 0;
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the quiz?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.isConfirmed) {
        clearInterval(this.timer);
        this.calculateResult();
      }
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.calculateResult();
      } else {
        this.timeLeft--;
        this.progressValue = (this.timeLeft / this.totalTime) * 100;
      }
    }, 1000);
  }

  getFormattedTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return minutes + ' : ' + (seconds < 10 ? '0' + seconds : seconds);
  }

  calculateResult() {
    clearInterval(this.timer);
    // get logged-in username to save result against student
    const userStr = localStorage.getItem('user');
const username = userStr ? JSON.parse(userStr).username : '';
    this._question.evalQuiz(this.questions, username).subscribe(
      (data: any) => {
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error) => {
        Swal.fire('Error', 'Failed to evaluate quiz.', 'error');
      }
    );
  }
}