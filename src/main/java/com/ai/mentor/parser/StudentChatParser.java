package com.ai.mentor.parser;

import com.ai.mentor.model.StudentChat;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StudentChatParser {

    /*
     * Matches lines like:
     *
     * [09:42, 28/06/2026] Utkarsh: Message
     * [13:08, 28/06/2026] +91 866 781 0764: Message
     */
    private static final Pattern MESSAGE_PATTERN = Pattern.compile(
            "^\\[(\\d{2}:\\d{2}),\\s*(\\d{2}/\\d{2}/\\d{4})\\]\\s*(.*?):\\s*(.*)$"
    );

    public List<StudentChat> parse(String completeChat) {

        Map<String, StudentChat> studentMap = new LinkedHashMap<>();

        String[] lines = completeChat.split("\\R");

        StudentChat currentStudent = null;

        for (String line : lines) {

            Matcher matcher = MESSAGE_PATTERN.matcher(line);

            if (matcher.matches()) {

                String studentName = matcher.group(3).trim();
                String message = matcher.group(4).trim();

                currentStudent = studentMap.computeIfAbsent(
                        studentName,
                        StudentChat::new
                );

                currentStudent.addMessage(message);

            } else {

                /*
                 * This is a continuation of the previous student's message.
                 */

                if (currentStudent != null && !line.isBlank()) {

                    currentStudent.addMessage(line.trim());

                }

            }

        }

        return new ArrayList<>(studentMap.values());

    }

}