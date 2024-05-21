package vn.edu.hcmute.boardinghousemanagementsystem.util;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

public class DateTimeUtil {
    public static LocalDate toLocalDate(String dateString, String pattern) {
        if (dateString == null) {
            return null;
        }
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

    public static boolean isDateInRange(LocalDate start, LocalDate end, LocalDate date) {
        return date.equals(start) || date.equals(end) || (date.isAfter(start) && date.isBefore(end));
    }
    public static Optional<LocalDate> getLatestDate(List<LocalDate> dates) {
        return dates.stream()
                .max(LocalDate::compareTo);
    }
}
