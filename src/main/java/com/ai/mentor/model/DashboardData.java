package com.ai.mentor.model;

import java.time.LocalDateTime;
import java.util.List;

public class DashboardData {

    private String sessionName;

    private LocalDateTime generatedAt;

    private ClassAnalytics classAnalytics;

    private List<StudentEvaluation> studentEvaluations;

    public DashboardData() {
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public ClassAnalytics getClassAnalytics() {
        return classAnalytics;
    }

    public void setClassAnalytics(ClassAnalytics classAnalytics) {
        this.classAnalytics = classAnalytics;
    }

    public List<StudentEvaluation> getStudentEvaluations() {
        return studentEvaluations;
    }

    public void setStudentEvaluations(List<StudentEvaluation> studentEvaluations) {
        this.studentEvaluations = studentEvaluations;
    }
}