package com.exam.controller;

import com.exam.model.User;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;
import com.exam.repo.ResultRepository;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import com.exam.service.UserService;
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
    private QuizService quizService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResultRepository resultRepository;

    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }
        list.forEach((q) -> q.setAnswer(""));
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId) {
        return questionService.getQuestion(quesId);
    }

    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId) {
        this.questionService.deleteQuestion(quesId);
    }

    @GetMapping("/attempts/{qid}")
    public ResponseEntity<?> getAttempts(@PathVariable("qid") Long qid) {
        List<Result> results = this.resultRepository.findByQuiz_qId(qid);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(
            @RequestBody List<Question> questions,
            @RequestParam(value = "username", required = false) String username) {

        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;
        Quiz quiz = null;

        for (Question q : questions) {
            Question dbQuestion = this.questionService.getQuestion(q.getQuesId());

            if (quiz == null) {
                quiz = dbQuestion.getQuiz();
            }

            if (q.getGivenAnswers() != null && !q.getGivenAnswers().trim().equals("")) {
                attempted++;
                String given   = resolveAnswer(q.getGivenAnswers().trim(), dbQuestion);
                String correct = resolveAnswer(dbQuestion.getAnswer().trim(), dbQuestion);
                if (given.equalsIgnoreCase(correct)) {
                    correctAnswers++;
                    double singleMarks = Double.parseDouble(
                            dbQuestion.getQuiz().getMaxMarks()) / questions.size();
                    marksGot += singleMarks;
                }
            }
        }

        // Save result to DB
        if (username != null && !username.isEmpty() && quiz != null) {
            try {
                User user = this.userService.getUser(username);
                Result result = new Result();
                result.setQuiz(quiz);
                result.setUser(user);
                result.setMarksGot(marksGot);
                result.setCorrectAnswers(correctAnswers);
                result.setAttempted(attempted);
                result.setTotalQuestions(questions.size());
                this.resultRepository.save(result);
                System.out.println("✅ Result saved for: " + username);
            } catch (Exception e) {
                System.out.println("❌ Could not save result: " + e.getMessage());
            }
        }

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("marksGot", marksGot);
        resultMap.put("correctAnswers", correctAnswers);
        resultMap.put("attempted", attempted);

        return ResponseEntity.ok(resultMap);
    }

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