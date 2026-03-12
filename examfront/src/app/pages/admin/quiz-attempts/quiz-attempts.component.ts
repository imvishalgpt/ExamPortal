import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-quiz-attempts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-attempts.component.html',
  styleUrl: './quiz-attempts.component.css',
  encapsulation: ViewEncapsulation.None
})
export class QuizAttemptsComponent implements OnInit {

  qid: any;
  quizTitle: string = '';
  attempts: any[] = [];
  isLoading: boolean = true;

  private avatarColors = [
    '#3d5af1', '#7c3aed', '#0ea47a', '#e8245e',
    '#f59e0b', '#0891b2', '#dc2626', '#059669'
  ];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.quizTitle = this._route.snapshot.params['title'] || 'Quiz';
    this.loadAttempts();
  }

  loadAttempts() {
    this.isLoading = true;
    this._question.getAttempts(this.qid).subscribe(
      (data: any) => {
        this.attempts = data;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  getAvgMarks(): number {
    if (!this.attempts.length) return 0;
    const total = this.attempts.reduce((sum, a) => sum + a.marksGot, 0);
    return total / this.attempts.length;
  }

  getTopScore(): number {
    if (!this.attempts.length) return 0;
    return Math.max(...this.attempts.map(a => a.marksGot));
  }

  getUniqueStudents(): number {
    const ids = new Set(this.attempts.map(a => a.user?.id));
    return ids.size;
  }

  getScorePercent(a: any): number {
    if (!a.totalQuestions) return 0;
    return (a.correctAnswers / a.totalQuestions) * 100;
  }

  getAvatarColor(index: number): string {
    return this.avatarColors[index % this.avatarColors.length];
  }
}