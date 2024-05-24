package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;

import java.util.List;

public interface RoomBookingService {
    RoomBooking save(RoomBooking roomBooking);

    void save(List<RoomBooking> roomBookings);

    //
}
