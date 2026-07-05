package com.ai.mentor.model;

public class EvaluationRequest {
    private String mentorSummary;
    private String chatLog;

    // Getters and Setters
    public String getMentorSummary() { return mentorSummary; }
    public void setMentorSummary(String mentorSummary) { this.mentorSummary = mentorSummary; }

    public String getChatLog() { return chatLog; }
    public void setChatLog(String chatLog) { this.chatLog = chatLog; }
}