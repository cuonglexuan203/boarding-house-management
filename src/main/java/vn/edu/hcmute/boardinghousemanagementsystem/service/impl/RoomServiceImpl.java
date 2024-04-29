package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoomRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final UserService userService;
    @Override
    public List<RoomDto> findAllRooms() {
        List<Room> rooms = roomRepository.findAll();

        return rooms.stream()
                .map(RoomDto::new)
                .collect(Collectors.toList());
    }


    @Override
    public List<RoomDto> findRoomsByUsername(String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        return user.getRoomBookings().stream()
                .map(RoomBooking::getRoom)
                .map(RoomDto::new)
                .collect(Collectors.toList());
    }

}
