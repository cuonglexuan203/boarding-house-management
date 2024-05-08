package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    Optional<Room> findById(long id);
    List<Room> findAllRooms();

    List<Room> findRoomsByUsername(String username);

    Room save(Room room);
    void save(List<Room> rooms);
}
