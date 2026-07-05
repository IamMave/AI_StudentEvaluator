package com.ai.mentor.util;

import com.ai.mentor.model.DashboardData;
import com.ai.mentor.model.StudentEvaluation;

public class DashboardPrinter {

    public void print(DashboardData dashboard) {

        System.out.println();
        System.out.println("==============================================");
        System.out.println("           MENTOR AI DASHBOARD");
        System.out.println("==============================================");

        System.out.println("Session      : " + dashboard.getSessionName());
        System.out.println("Generated At : " + dashboard.getGeneratedAt());

        System.out.println();

        System.out.println("Students Evaluated : "
                + dashboard.getClassAnalytics().getTotalStudents());

        System.out.println("Average Score : "
                + String.format("%.2f",
                dashboard.getClassAnalytics().getAverageScore()));

        System.out.println();

        System.out.println("==============================================");

        for (StudentEvaluation student :
                dashboard.getStudentEvaluations()) {

            System.out.printf("%-20s %3d/100%n",
                    student.getStudentName(),
                    student.getScore());

        }

        System.out.println("==============================================");

    }

}