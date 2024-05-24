package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import java.time.LocalDate;
import java.util.Date;

public record RoomBookingDto(
        Long id,
        LocalDate checkInDate,
        LocalDate checkOutDate
) {
    public RoomBookingDto(RoomBooking roomBooking) {
        this(roomBooking.getId(), roomBooking.getCheckInDate(), roomBooking.getCheckOutDate());
    }

    public static RoomBookingDto of(RoomBooking roomBooking) {
        return new RoomBookingDto(roomBooking);
    }
}
