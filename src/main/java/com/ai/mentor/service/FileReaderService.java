package com.ai.mentor.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileReaderService {

    private static final String FILE_PATH =
            "src/main/resources/mentor-summary.txt";

    public String readMentorSummary() {

        try {

            return Files.readString(Path.of(FILE_PATH));

        } catch (IOException e) {

            throw new RuntimeException(
                    "Unable to read mentor-summary.txt",
                    e
            );

        }

    }

}