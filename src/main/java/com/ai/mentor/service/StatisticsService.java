package com.ai.mentor.service;

import com.ai.mentor.model.ClassStatistics;
import com.ai.mentor.model.StudentEvaluation;

import java.util.Comparator;
import java.util.List;

public class StatisticsService {

    public ClassStatistics generate(List<StudentEvaluation> evaluations) {

        ClassStatistics statistics = new ClassStatistics();

        statistics.setTotalStudents(evaluations.size());

        statistics.setAverageScore(
                evaluations.stream()
                        .mapToInt(StudentEvaluation::getScore)
                        .average()
                        .orElse(0)
        );

        statistics.setHighestScorer(
                evaluations.stream()
                        .max(Comparator.comparingInt(StudentEvaluation::getScore))
                        .orElse(null)
        );

        statistics.setLowestScorer(
                evaluations.stream()
                        .min(Comparator.comparingInt(StudentEvaluation::getScore))
                        .orElse(null)
        );

        return statistics;

    }

}