package com.ai.mentor.export;

import com.ai.mentor.model.DashboardData;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;

public class DashboardExporter {

    public void export(DashboardData dashboardData) {

        try {

            ObjectMapper mapper = new ObjectMapper();

            mapper.findAndRegisterModules();

            mapper.enable(SerializationFeature.INDENT_OUTPUT);

            mapper.writeValue(
                    new File("dashboard-data.json"),
                    dashboardData
            );

            System.out.println();
            System.out.println("Dashboard JSON exported successfully.");
            System.out.println("Location : dashboard-data.json");

        } catch (Exception e) {

            throw new RuntimeException("Unable to export Dashboard JSON", e);

        }

    }

}