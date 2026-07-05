package com.ai.mentor.parser;

import com.ai.mentor.model.StudentEvaluation;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ResponseParser {

    private final ObjectMapper objectMapper;

    public ResponseParser() {
        this.objectMapper = new ObjectMapper();
    }

    public StudentEvaluation parse(String aiResponse) {

        try {

            return objectMapper.readValue(
                    aiResponse,
                    StudentEvaluation.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Unable to parse AI response.",
                    e
            );

        }

    }

}