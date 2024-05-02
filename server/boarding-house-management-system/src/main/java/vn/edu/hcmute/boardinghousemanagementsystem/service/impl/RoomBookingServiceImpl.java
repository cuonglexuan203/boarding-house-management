package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoomBookingRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomBookingService;

import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class RoomBookingServiceImpl implements RoomBookingService {
    private final RoomBookingRepository roomBookingRepo;

    @Override
    public RoomBooking save(RoomBooking roomBooking) {
        if(roomBookingRepo == null){
            log.error("RoomBooking instance is null");
            return null;
        }
        return roomBookingRepo.save(roomBooking);
    }

    @Override
    public void save(List<RoomBooking> roomBookings) {
        if(roomBookings == null){
            log.error("RoomBookings is null");
            return;
        }
        roomBookingRepo.saveAll(roomBookings);
    }
}
