package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.AccommodationServiceNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoomRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AccommodationServiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final UserService userService;
    private final AccommodationServiceService accommodationServiceService;

    @Override
    public Optional<Room> findById(long id) {
        if (id <= 0) {
            return Optional.empty();
        }
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }


    @Override
    public List<Room> findByUsername(String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        List<Room> rooms = new ArrayList<>();

        for (RoomBooking roomBooking : user.getRoomBookings()) {
            rooms.add(roomBooking.getRoom());
        }

        return rooms;
    }

    @Override
    public Room save(Room room) {
        if (room == null) {
            log.error("Room instance is null");
            return null;
        }
        return roomRepository.save(room);
    }

    @Override
    public void save(List<Room> rooms) {
        if (rooms == null) {
            log.error("Rooms is null");
            return;
        }
        roomRepository.saveAll(rooms);
    }

    @Override
    public void delete(long id) {
        if (id <= 0) {
            return;
        }
        if (!roomRepository.existsById(id)) {
            return;
        }
        Room room = roomRepository.findById(id).get();
        List<RoomBooking> roomBookings = room.getRoomBookings();
        for (RoomBooking roomBooking : roomBookings) {
            roomBooking.setRoom(null);
        }
        room.getRoomBookings().clear();
        //
        for(AccommodationService service : room.getServices()){
            service.getRooms().remove(room);
        }
        room.getServices().clear();
        //
        roomRepository.delete(room);
    }

    //
    @Override
    public List<Room> getRooms() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            List<Room> rooms = findAll();
            return rooms;
        }
        List<Room> rooms = findByUsername(username);
        return rooms;
    }

    @Override
    public List<RoomDto> getRoomDtos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            List<RoomDto> roomDtos = findAll().stream().map(RoomDto::new).collect(Collectors.toList());
            return roomDtos;
        }
        List<RoomDto> roomDtos = findByUsername(username).stream().map(RoomDto::new).collect(Collectors.toList());
        return roomDtos;
    }

    @Override
    public Room save(RoomDto roomDto) {
        Room newRoom = roomDto.getNewRoom();
        List<AccommodationService> managedServices = new ArrayList<>();
        for (AccommodationService service : newRoom.getServices()) {
            AccommodationService managedService;
            if(service.getId() == null){
                return null;
            }
            managedService = accommodationServiceService.findById(service.getId())
                    .orElseThrow(() -> new AccommodationServiceNotFoundException("Service not found"));
            managedService.getRooms().add(newRoom);
            managedServices.add(managedService);
        }
        newRoom.setServices(managedServices);
        Room persistedRoom = save(newRoom);
        return persistedRoom;
    }

    @Override
    public Room update(RoomDto roomDto) {
        long id = roomDto.id();
        Room existingRoom = findById(id).orElseThrow(() -> new RoomNotFoundException("Room not found by id: " + id));
        //
        updateRoomFields(existingRoom, roomDto);
        //
        Room persistedRoom = save(existingRoom);
        return persistedRoom;
    }

    private Room updateRoomFields(Room des, RoomDto srcDto) {
        Room src = srcDto.getRoom();
        src.setId(null);
        return ObjectUtil.reflectNonNullField(des, src, Room.class);
    }
}
