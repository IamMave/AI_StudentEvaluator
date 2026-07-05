package com.ai.mentor.service;

import com.ai.mentor.model.ClassAnalytics;
import com.ai.mentor.model.StudentEvaluation;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ClassAnalyticsService {

    public ClassAnalytics generateAnalytics(List<StudentEvaluation> evaluations) {

        ClassAnalytics analytics = new ClassAnalytics();

        analytics.setTotalStudents(evaluations.size());

        analytics.setAverageScore(
                evaluations.stream()
                        .mapToInt(StudentEvaluation::getScore)
                        .average()
                        .orElse(0)
        );

        analytics.setHighestScorer(
                evaluations.stream()
                        .max(Comparator.comparingInt(StudentEvaluation::getScore))
                        .orElse(null)
        );

        analytics.setLowestScorer(
                evaluations.stream()
                        .min(Comparator.comparingInt(StudentEvaluation::getScore))
                        .orElse(null)
        );

        analytics.setTopPerformers(
                evaluations.stream()
                        .sorted(Comparator.comparingInt(StudentEvaluation::getScore).reversed())
                        .limit(3)
                        .collect(Collectors.toList())
        );

        analytics.setStudentsNeedingAttention(
                evaluations.stream()
                        .filter(student -> student.getScore() < 60)
                        .collect(Collectors.toList())
        );

        return analytics;

    }

}