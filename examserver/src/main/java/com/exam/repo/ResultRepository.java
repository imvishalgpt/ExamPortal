package com.exam.repo;

import com.exam.model.exam.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {

    // All attempts for a specific quiz (used for "Attempts" button)
    List<Result> findByQuiz_qId(Long quizId);

    // All attempts by a specific user
    List<Result> findByUser_Id(Long userId);

    // Count total attempts for a quiz
    long countByQuiz_qId(Long quizId);
}