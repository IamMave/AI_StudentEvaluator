package com.ai.mentor.ai;

import com.ai.mentor.ai.model.Content;
import com.ai.mentor.ai.model.GeminiRequest;
import com.ai.mentor.ai.model.GeminiResponse;
import com.ai.mentor.ai.model.Part;
import com.ai.mentor.config.AppConstants;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class AIService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public AIService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public String generateResponse(String prompt) {

        try {

            long start = System.currentTimeMillis();

            System.out.println("Sending request to Gemini...");

            GeminiRequest requestBody =
                    new GeminiRequest(
                            List.of(
                                    new Content(
                                            List.of(
                                                    new Part(prompt)
                                            )
                                    )
                            )
                    );

            String jsonRequest =
                    objectMapper.writeValueAsString(requestBody);

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(AppConstants.GEMINI_URL))
                            .header("Content-Type", "application/json")
                            .POST(HttpRequest.BodyPublishers.ofString(jsonRequest))
                            .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() != 200) {

                throw new RuntimeException(
                        "Gemini API Error\nStatus: "
                                + response.statusCode()
                                + "\nResponse:\n"
                                + response.body()
                );

            }

            GeminiResponse geminiResponse =
                    objectMapper.readValue(
                            response.body(),
                            GeminiResponse.class
                    );

            String text =
                    geminiResponse
                            .getCandidates()
                            .get(0)
                            .getContent()
                            .getParts()
                            .get(0)
                            .getText();

            System.out.println("Response received in "
                    + (System.currentTimeMillis() - start) + " ms");

            return text;

        } catch (IOException | InterruptedException e) {

            throw new RuntimeException(
                    "Unable to communicate with Gemini",
                    e
            );

        }

    }

}