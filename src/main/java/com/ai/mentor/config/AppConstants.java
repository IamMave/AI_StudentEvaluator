package com.ai.mentor.config;

public final class AppConstants {

    private AppConstants() {
    }

    public static final String MENTOR_SUMMARY_FILE =
            "src/main/resources/mentor-summary.txt";


    public static final String GEMINI_API_KEY =
            "AQ.Ab8RN6IfLOQLPNPD6zwwaZvk1rUnOOQFEMNpwqABcB9irk1jdA";

    public static final String GEMINI_MODEL =
            "gemini-2.5-flash";

    public static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/"
                    + GEMINI_MODEL
                    + ":generateContent?key="
                    + GEMINI_API_KEY;

    //public static final String OLLAMA_URL =
    //        "http://localhost:11434/api/generate";

    //public static final String MODEL_NAME =
    //        "qwen2.5:3b";

}