package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    public QuestionService questionService;

    @Autowired
    private QuizService     quizService;

    //add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question)
    {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update the question
    @PutMapping("/")
    public ResponseEntity<Question> update (@RequestBody Question question)
    {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get all question of any quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid){

//        Quiz quiz = new Quiz();
//        quiz.setqId(qid);
//        Set<Question> questionsOfQuiz =this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);
      Quiz quiz=  this.quizService.getQuiz(qid);

        Set<Question> questions = quiz.getQuestions();
        List<Question> list= new ArrayList(questions);
        if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions()))
        {
            list= list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        list.forEach((q)->{
            q.setAnswer("" );
        });
        Collections.shuffle(list);
        return ResponseEntity.ok(list);

    }//get all question of any quiz
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid){
        Quiz quiz = this.quizService.getQuiz(qid);  // fetch full quiz object
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }



    //get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId)
    {
        return questionService.getQuestion(quesId);
    }

    //delete question

    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId)
    {
        this.questionService.deleteQuestion(quesId);
    }

    //eval quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {

        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;

        for (Question q : questions) {

            Question dbQuestion = this.questionService.getQuestion(q.getQuesId());

            if (q.getGivenAnswers() != null && !q.getGivenAnswers().trim().equals("")) {

                attempted++;

                String given = q.getGivenAnswers().trim();
                String correct = dbQuestion.getAnswer().trim();

                // Resolve option key → actual text (handles "option1", "option-1" etc.)
                String resolvedCorrect = resolveAnswer(correct, dbQuestion);
                String resolvedGiven   = resolveAnswer(given, dbQuestion);

                if (resolvedGiven.equalsIgnoreCase(resolvedCorrect)) {
                    correctAnswers++;
                    double singleMarks = Double.parseDouble(
                            dbQuestion.getQuiz().getMaxMarks()) / questions.size();
                    marksGot += singleMarks;
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("marksGot", marksGot);
        result.put("correctAnswers", correctAnswers);
        result.put("attempted", attempted);

        return ResponseEntity.ok(result);
    }

    // Resolves "option1"/"option-1"/"option-2" etc. to actual option text
    private String resolveAnswer(String value, Question q) {
        if (value == null) return "";
        String v = value.trim().toLowerCase().replace("-", "");
        switch (v) {
            case "option1": return q.getOption1() != null ? q.getOption1().trim() : value;
            case "option2": return q.getOption2() != null ? q.getOption2().trim() : value;
            case "option3": return q.getOption3() != null ? q.getOption3().trim() : value;
            case "option4": return q.getOption4() != null ? q.getOption4().trim() : value;
            default: return value;
        }
    }
}
