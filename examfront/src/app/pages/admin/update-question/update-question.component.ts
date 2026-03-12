import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [...MaterialModule],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css',
  
})
export class UpdateQuestionComponent implements OnInit{

  quesId:any;

  question:any={
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){}

  ngOnInit(): void {

    // get question id from URL
    this.quesId=this._route.snapshot.params['quesId'];

    // load question data
    this._question.getQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.question=data;
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  updateQuestion(){

    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question Updated Successfully','success');
      },
      (error)=>{
        Swal.fire('Error','Error updating question','error');
      }
    )

  }

}