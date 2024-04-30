package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

public record RoomDto(
        Long id,
        float rentAmount,
        String roomNumber,
        String floor,
        float area,
        String type,
        String status
) {
    public RoomDto(Room room) {
        this(room.getId(), room.getRentAmount(), room.getRoomNumber(),
                room.getFloor().toString(), room.getArea(), room.getType().toString(),
                room.getStatus().toString());
    }
}
