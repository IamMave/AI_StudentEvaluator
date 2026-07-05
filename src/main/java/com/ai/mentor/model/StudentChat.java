package com.ai.mentor.model;

public class StudentChat {

    private final String name;
    private final StringBuilder combinedMessage;
    private int messageCount;

    public StudentChat(String name) {
        this.name = name;
        this.combinedMessage = new StringBuilder();
        this.messageCount = 0;
    }

    public String getName() {
        return name;
    }

    public String getCombinedMessage() {
        return combinedMessage.toString();
    }

    public int getMessageCount() {
        return messageCount;
    }

    public void addMessage(String message) {

        if (message == null || message.isBlank()) {
            return;
        }

        if (combinedMessage.length() > 0) {
            combinedMessage.append(System.lineSeparator())
                    .append(System.lineSeparator());
        }

        combinedMessage.append(message.trim());

        messageCount++;
    }

    @Override
    public String toString() {
        return "StudentChat{" +
                "name='" + name + '\'' +
                ", messageCount=" + messageCount +
                '}';
    }
}