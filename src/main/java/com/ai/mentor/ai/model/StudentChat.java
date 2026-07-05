package com.ai.mentor.ai.model;

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

        if (!combinedMessage.isEmpty()) {
            combinedMessage.append(System.lineSeparator())
                    .append(System.lineSeparator());
        }

        combinedMessage.append(message.trim());

        messageCount++;
    }

    @Override
    public String toString() {

        return """
                ----------------------------------------
                Student Name : %s
                Messages     : %d

                Student Understanding

                %s

                ----------------------------------------
                """.formatted(
                name,
                messageCount,
                getCombinedMessage()
        );

    }

}