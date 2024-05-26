package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDetailsDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    Optional<Room> findById(long id);
    List<Room> findAll();

    List<Room> findByUsername(String username);

    Room save(Room room);
    void save(List<Room> rooms);

    void delete(long id);
    //
    List<Room> getRooms();
    List<RoomDto> getRoomDtos();
    RoomBooking getLatestRoomBookingInUse(long roomId);
    RoomDetailsDto getRoomDetailsDto(long roomId);
    Room addNewRoom(RoomDto roomDto);
    Room save(RoomDto roomDto);
    Room update(RoomDto roomDto);

}
