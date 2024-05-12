package vn.edu.hcmute.boardinghousemanagementsystem.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateTimeUtil {
    public static LocalDate toLocalDate(String dateString, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        LocalDate localDate = null;
        try {
            localDate = LocalDate.parse(dateString, formatter);
        } catch (DateTimeParseException e) {
            System.out.println("Error: Unable to parse date string. Invalid format.");
            e.printStackTrace();
        }
        return localDate;
    }
}
