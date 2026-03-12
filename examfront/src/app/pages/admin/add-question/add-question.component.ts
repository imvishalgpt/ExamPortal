import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { QuestionService } from '../../../services/question.service';
import { ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule, CKEditorModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddQuestionComponent implements OnInit {

  public Editor: any = ClassicEditor;
  public config: any = {
    placeholder: 'Write your question here...',
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link',
      'bulletedList', 'numberedList', '|',
      'undo', 'redo'
    ],
  };

  qId: any;
  qTitle: any;

  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;
  }

  // ✅ Resets form but KEEPS quiz reference
  private resetForm() {
    this.question = {
      quiz: { qId: this.qId },  // <-- preserve quiz ID
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
    };
  }

  formSubmit() {
    if (!this.question.content?.trim()) return;
    if (!this.question.option1?.trim()) return;
    if (!this.question.option2?.trim()) return;
    if (!this.question.answer?.trim()) return;

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added', 'success');
        this.resetForm(); // ✅ uses resetForm() not inline object
      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}