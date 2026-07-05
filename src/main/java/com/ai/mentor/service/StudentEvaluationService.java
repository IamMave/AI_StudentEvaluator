package com.ai.mentor.service;

import com.ai.mentor.ai.AIService;
import com.ai.mentor.prompts.StudentEvaluationPromptBuilder;
import com.ai.mentor.model.StudentChat;
import com.ai.mentor.model.StudentEvaluation;
import com.ai.mentor.parser.ResponseParser;

public class StudentEvaluationService {

    private final StudentEvaluationPromptBuilder promptBuilder;
    private final AIService aiService;
    private final ResponseParser responseParser;

    public StudentEvaluationService() {

        this.promptBuilder = new StudentEvaluationPromptBuilder();
        this.aiService = new AIService();
        this.responseParser = new ResponseParser();

    }

    public StudentEvaluation evaluateStudent(String mentorSummary,
                                             StudentChat studentChat) {

        System.out.println();
        System.out.println("========================================");
        System.out.println("Evaluating : " + studentChat.getName());
        System.out.println("========================================");

        // Step 1 - Build prompt
        String prompt =
                promptBuilder.buildPrompt(
                        mentorSummary,
                        studentChat
                );

        // Step 2 - Send to AI
        String aiResponse =
                aiService.generateResponse(prompt);

        StudentEvaluation evaluation =
                responseParser.parse(aiResponse);

        // Step 3 - Convert JSON into Java Object
        return evaluation;

    }

}