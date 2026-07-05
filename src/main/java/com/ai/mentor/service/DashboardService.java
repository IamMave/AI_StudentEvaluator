package com.ai.mentor.service;

import com.ai.mentor.model.ClassAnalytics;
import com.ai.mentor.model.DashboardData;
import com.ai.mentor.model.StudentEvaluation;
import java.util.Comparator;

import java.time.LocalDateTime;
import java.util.List;

public class DashboardService {


    public DashboardData buildDashboard(String sessionName,
                                        List<StudentEvaluation> evaluations,
                                        ClassAnalytics analytics) {

        DashboardData dashboard = new DashboardData();
        evaluations.sort(
                Comparator.comparingInt(StudentEvaluation::getScore)
                        .reversed()
        );
        dashboard.setSessionName(sessionName);
        dashboard.setGeneratedAt(LocalDateTime.now());
        dashboard.setStudentEvaluations(evaluations);
        dashboard.setClassAnalytics(analytics);

        return dashboard;
    }

    public StudentEvaluation findStudent(
            DashboardData dashboard,
            String name) {

        return dashboard.getStudentEvaluations()
                .stream()
                .filter(student ->
                        student.getStudentName()
                                .equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);

    }

}