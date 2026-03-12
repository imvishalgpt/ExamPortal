import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }

  getQuestionOfQuiz(id: any) {
  return this._http.get(`${baseUrl}/question/quiz/all/${id}`);
}
  public getQuestionOfQuizForTest(qId: any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`)


  }

  public addQuestion(question: any){
    return this._http.post(`${baseUrl}/question/`,question);

  }

  public deleteQuestion(questionId: any){
  return this._http.delete(`${baseUrl}/question/${questionId}`);

  
 
}

 public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

public getQuestion(quesId:any){
  return this._http.get(`${baseUrl}/question/${quesId}`);
}

//eval-quiz
evalQuiz(questions: any[], username: string = '') {
  return this._http.post(
    `${baseUrl}/question/eval-quiz?username=${username}`,
    questions,
  
  );
}

// Get all attempts for a quiz
getAttempts(qid: any) {
  return this._http.get(
    `${baseUrl}/question/attempts/${qid}`,
    
  );
}



}
