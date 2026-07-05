package com.ai.mentor.service;

import java.util.Scanner;

public class ChatInputService {

    private final Scanner scanner = new Scanner(System.in);

    public String readCompleteChat() {

        System.out.println();
        System.out.println("Paste the complete WhatsApp chat.");
        System.out.println("Type END on a new line when finished.");
        System.out.println();

        StringBuilder chat = new StringBuilder();

        while (true) {

            String line = scanner.nextLine();

            if ("END".equalsIgnoreCase(line.trim())) {
                break;
            }

            chat.append(line)
                    .append(System.lineSeparator());

        }

        return chat.toString();

    }

}