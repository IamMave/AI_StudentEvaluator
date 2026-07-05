package com.ai.mentor.model;

public class ClassStatistics {

    private int totalStudents;

    private double averageScore;

    private StudentEvaluation highestScorer;

    private StudentEvaluation lowestScorer;

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
}