package com.ai.mentor.model;

import java.util.List;

public class StudentEvaluation {

    private String studentName;

    private int score;

    private int confidence;

    private String understandingSummary;

    private List<String> strengths;

    private List<String> missingConcepts;

    private String mentorRecommendations;

    private String nextLearningGoal;

    private String feedback;

    private String status;

    public StudentEvaluation() {
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getConfidence() {
        return confidence;
    }

    public void setConfidence(int confidence) {
        this.confidence = confidence;
    }

    public String getUnderstandingSummary() {
        return understandingSummary;
    }

    public void setUnderstandingSummary(String understandingSummary) {
        this.understandingSummary = understandingSummary;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getMissingConcepts() {
        return missingConcepts;
    }

    public void setMissingConcepts(List<String> missingConcepts) {
        this.missingConcepts = missingConcepts;
    }

    public String getMentorRecommendations() {
        return mentorRecommendations;
    }

    public void setMentorRecommendations(String mentorRecommendations) {
        this.mentorRecommendations = mentorRecommendations;
    }

    public String getNextLearningGoal() {
        return nextLearningGoal;
    }

    public void setNextLearningGoal(String nextLearningGoal) {
        this.nextLearningGoal = nextLearningGoal;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}