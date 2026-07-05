package com.ai.mentor.service;

import com.ai.mentor.model.ClassAnalytics;
import com.ai.mentor.model.DashboardData;
import com.ai.mentor.model.StudentChat;
import com.ai.mentor.model.StudentEvaluation;
import com.ai.mentor.parser.StudentChatParser;
import com.ai.mentor.util.ConsoleHelper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ai.mentor.ai.AIService; // Ensure this import points to your AIService package


import java.util.ArrayList;
import java.util.List;

public class EvaluationService {

    private final FileReaderService fileReaderService;
    private final ChatInputService chatInputService;
    private final StudentChatParser studentChatParser;
    private final StudentEvaluationService studentEvaluationService;

    private final ClassAnalyticsService classAnalyticsService;
    private final DashboardService dashboardService;



    public EvaluationService() {

        fileReaderService = new FileReaderService();
        chatInputService = new ChatInputService();
        studentChatParser = new StudentChatParser();
        studentEvaluationService = new StudentEvaluationService();

        classAnalyticsService = new ClassAnalyticsService();
        dashboardService = new DashboardService();



    }

    public DashboardData evaluate() {

        ConsoleHelper.printHeader();

        String mentorSummary =
                fileReaderService.readMentorSummary();

        String completeChat =
                chatInputService.readCompleteChat();

        List<StudentChat> students =
                studentChatParser.parse(completeChat);

        List<StudentEvaluation> evaluations =
                new ArrayList<>();

        for (StudentChat student : students) {

            StudentEvaluation evaluation =
                    studentEvaluationService.evaluateStudent(
                            mentorSummary,
                            student
                    );

            evaluations.add(evaluation);

        }

        ClassAnalytics analytics =
                classAnalyticsService.generateAnalytics(
                        evaluations
                );

        return dashboardService.buildDashboard(
                "Mentor AI Session",
                evaluations,
                analytics
        );

    }
    // Add this new method to EvaluationService.java
    // Add this new method to EvaluationService.java


// ... keep your other imports and constructor exactly the same ...

    // Replace your web evaluate method with this batch version


// ... keep your other imports and constructor exactly the same ...

    // Replace your web evaluate method with this batch version
    public DashboardData evaluate(String mentorSummary, String completeChat) {

        // 1. Create a Master Prompt that forces Gemini to evaluate everyone at once
        String batchPrompt = """
            You are an AI Student Evaluator. Analyze the entire WhatsApp chat log and evaluate every student who participated based on the provided mentor summary.
            
            CRITICAL INSTRUCTIONS:
            1. You must evaluate EVERY student found in the chat log.
            2. Return ONLY a valid JSON object matching the exact schema below. 
            3. Do NOT wrap the response in markdown code blocks, do NOT use backticks (```), and do NOT include any conversational text.
            
            Strict JSON Schema:
            {
              "studentEvaluations": [
                {
                  "studentName": "Student Name",
                  "score": 85,
                  "confidence": 90,
                  "understandingSummary": "Detailed summary of what they understood...",
                  "strengths": ["Strength point 1", "Strength point 2"],
                  "missingConcepts": ["Missing concept 1"],
                  "mentorRecommendations": "Actionable recommendation for the mentor...",
                  "nextLearningGoal": "Specific next learning goal..."
                }
              ]
            }
            
            Mentor Summary:
            %s
            
            WhatsApp Chat Log:
            %s
            """.formatted(mentorSummary, completeChat);

        List<StudentEvaluation> evaluations = new ArrayList<>();
        AIService batchAiService = new AIService();

        try {
            System.out.println("Sending a single batch request to Gemini for the entire cohort...");
            String rawAiResponse = batchAiService.generateResponse(batchPrompt);

            // Defensive cleaning against markdown code blocks
            String cleanJson = rawAiResponse
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            // 2. Parse the array out of the batch JSON response using Jackson
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(cleanJson);
            JsonNode arrayNode = rootNode.path("studentEvaluations");

            if (arrayNode.isArray()) {
                for (JsonNode node : arrayNode) {
                    // Turn each JSON item into a local StudentEvaluation Java Object
                    StudentEvaluation eval = mapper.treeToValue(node, StudentEvaluation.class);
                    evaluations.add(eval);
                }
            }

        } catch (Exception e) {
            System.err.println("CRITICAL: Batch evaluation or parsing failed: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Batch AI processing failed: " + e.getMessage());
        }

        // 3. Keep using your existing local services to process analytics and dashboard builds!
        ClassAnalytics analytics = classAnalyticsService.generateAnalytics(evaluations);

        return dashboardService.buildDashboard("Mentor AI Session", evaluations, analytics);
    }
}