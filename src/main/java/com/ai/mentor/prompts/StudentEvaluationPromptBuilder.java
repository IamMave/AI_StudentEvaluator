package com.ai.mentor.prompts;

import com.ai.mentor.model.StudentChat;

public class StudentEvaluationPromptBuilder {

    public String buildPrompt(String mentorSummary,
                              StudentChat studentChat) {

        return String.format("""
You are an experienced technical mentor.

Compare the student's understanding with the mentor summary.

MENTOR SUMMARY:
%s

STUDENT NAME:
%s

STUDENT UNDERSTANDING:
%s

Return ONLY valid JSON.
Do not wrap the response in markdown code blocks, do not use backticks (```), and do not include any conversational text before or after the JSON.

{
  "studentName": "",
  "score": 0,
  "confidence": 0,
  "understandingSummary": "",
  "strengths": [
    "One-line strength"
  ],
  "missingConcepts": [
    "One-line missing concept"
  ],
  "mentorRecommendations": [
    "One-line recommendation"
  ],
  "nextLearningGoal": "",
  "feedback": ""
}

Evaluation Rules

- Compare ONLY against the mentor summary.
- Ignore grammar, spelling and English.
- Evaluate ONLY technical understanding.
- Do NOT invent concepts that are not present in the mentor summary.
- Score must be between 0 and 100.
- Confidence must be between 0 and 100.
- Keep understandingSummary concise (2-3 sentences maximum).
- strengths must contain ONLY one-line strings.
- missingConcepts must contain ONLY one-line strings.
- mentorRecommendations MUST contain EXACTLY ONE actionable sentence.
- mentorRecommendations MUST be an array containing ONLY ONE plain string.
- Do NOT return objects inside any array.
- Do NOT use keys like action, rationale, title, description or explanation.
- Return ONLY valid JSON.
- Do NOT use Markdown.

Correct Example:

"mentorRecommendations": [
  "Practice creating TestNG suites using testng.xml."
]

Wrong Example:

"mentorRecommendations": [
  {
    "action": "Practice creating TestNG suites",
    "rationale": "Student missed suite configuration"
  }
]
""", mentorSummary,
                studentChat.getName(),
                studentChat.getCombinedMessage());
    }
}