package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Contract;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoomBookingRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomBookingService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.DateTimeUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class RoomBookingServiceImpl implements RoomBookingService {
    private final RoomBookingRepository roomBookingRepo;
    private final RoomService roomService;

    @Override
    public RoomBooking save(RoomBooking roomBooking) {
        if (roomBookingRepo == null) {
            log.error("RoomBooking instance is null");
            return null;
        }
        return roomBookingRepo.save(roomBooking);
    }

    @Override
    public void save(List<RoomBooking> roomBookings) {
        if (roomBookings == null) {
            log.error("RoomBookings is null");
            return;
        }
        roomBookingRepo.saveAll(roomBookings);
    }

}
