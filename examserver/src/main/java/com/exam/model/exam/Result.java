package com.exam.model.exam;

import com.exam.model.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Which quiz was attempted
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    // Which student attempted
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private double marksGot;
    private int correctAnswers;
    private int attempted;
    private int totalQuestions;

    private LocalDateTime attemptedOn;

    @PrePersist
    public void prePersist() {
        this.attemptedOn = LocalDateTime.now();
    }

    // ── Getters & Setters ──

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public double getMarksGot() { return marksGot; }
    public void setMarksGot(double marksGot) { this.marksGot = marksGot; }

    public int getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(int correctAnswers) { this.correctAnswers = correctAnswers; }

    public int getAttempted() { return attempted; }
    public void setAttempted(int attempted) { this.attempted = attempted; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public LocalDateTime getAttemptedOn() { return attemptedOn; }
    public void setAttemptedOn(LocalDateTime attemptedOn) { this.attemptedOn = attemptedOn; }
}