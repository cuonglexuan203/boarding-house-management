package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

import java.util.List;

public interface RoomService {
    List<Room> findAllRooms();

    List<Room> findRoomsByUsername(String username);

    Room save(Room room);
    void save(List<Room> rooms);
}
