package com.ai.mentor;

import com.ai.mentor.model.DashboardData;
import com.ai.mentor.model.EvaluationRequest;
import com.ai.mentor.service.EvaluationService;
import io.javalin.Javalin;
import io.javalin.json.JavalinJackson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;

import io.javalin.json.JavalinJackson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class Main {
    public static void main(String[] args) {


/// 1. Create your configured ObjectMapper
        ObjectMapper mapper = new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

// 2. Start Javalin and use the updateMapper method
        Javalin app = Javalin.create(config -> {
            config.jsonMapper(new JavalinJackson());
            // If the above line still fails, use this instead:
            // JavalinJackson.defaultMapper = mapper;

            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        }).start(8080);

        System.out.println("🚀 AI Mentor Backend is live on http://localhost:8080");

        // 3. Define the REST API Endpoint
        app.post("/api/evaluate", ctx -> {

            // Catch the incoming JSON request
            EvaluationRequest request = ctx.bodyAsClass(EvaluationRequest.class);

            System.out.println("Received evaluation request. Processing with Gemini...");

            // Run your service logic
            EvaluationService service = new EvaluationService();
            DashboardData dashboard = service.evaluate(
                    request.getMentorSummary(),
                    request.getChatLog()
            );

            System.out.println("Evaluation complete! Sending data back to UI.");

            // Return the result
            ctx.json(dashboard);
        });
    }
}