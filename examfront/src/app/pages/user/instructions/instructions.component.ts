import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit{

  qid:any;
  quiz:any;

  constructor(
    private _route:ActivatedRoute, 
    private _quiz: QuizService,
    private _router:Router,
  ){}

  ngOnInit(): void {
    this.qid= this._route.snapshot.params['qid'];
   this._quiz.getQuiz(this.qid).subscribe(
    (data)=>{
      // console.log(data);
      this.quiz=data;
      
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error',"Error in loading quiz from server",'error');
      
    }
   )
    
  }

  startQuiz(){
    Swal.fire({
  title: "Do you want to start the quiz?",
  
  showCancelButton: true,
  confirmButtonText: "Start",
  
  icon: 'info'
}).then((result) => {
  if (result.isConfirmed) {
    this._router.navigate(['/start/'+this.qid])
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
  }

}
