package com.ai.mentor.model;

import java.util.List;

public class ClassAnalytics {

    private int totalStudents;
    private double averageScore;

    private StudentEvaluation highestScorer;
    private StudentEvaluation lowestScorer;

    private List<StudentEvaluation> topPerformers;
    private List<StudentEvaluation> studentsNeedingAttention;

    public int getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(int totalStudents) {
        this.totalStudents = totalStudents;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public StudentEvaluation getHighestScorer() {
        return highestScorer;
    }

    public void setHighestScorer(StudentEvaluation highestScorer) {
        this.highestScorer = highestScorer;
    }

    public StudentEvaluation getLowestScorer() {
        return lowestScorer;
    }

    public void setLowestScorer(StudentEvaluation lowestScorer) {
        this.lowestScorer = lowestScorer;
    }

    public List<StudentEvaluation> getTopPerformers() {
        return topPerformers;
    }

    public void setTopPerformers(List<StudentEvaluation> topPerformers) {
        this.topPerformers = topPerformers;
    }

    public List<StudentEvaluation> getStudentsNeedingAttention() {
        return studentsNeedingAttention;
    }

    public void setStudentsNeedingAttention(List<StudentEvaluation> studentsNeedingAttention) {
        this.studentsNeedingAttention = studentsNeedingAttention;
    }
}