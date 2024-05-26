package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.ToString;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Floor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomStatus;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomType;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.AvailableValues;

import java.util.List;
import java.util.stream.Collectors;

public record RoomDto(
        @Min(value = 0, message = "Room id must be greater than or equal to 0")
        Long id,

        String roomNumber,

        @Min(value = 0, message = "Rent amount must be greater than or equal to 0")
        Float rentAmount,

        @AvailableValues(values = {"GROUND", "ONE", "TWO", "THREE", "FOUR", "FIVE"})
        String floor,

        @Min(value = 0, message = "Area must be greater than or equal to 0")
        Float area,

        @AvailableValues(values = {"SINGLE", "DOUBLE"})
        String type,

        @AvailableValues(values = {"AVAILABLE", "OCCUPIED"})
        String status,

        List<AccommodationServiceDto> services

) {
    public RoomDto(Room room) {
        this(room.getId(), room.getRoomNumber(), room.getRentAmount(),
                room.getFloor().toString(), room.getArea(), room.getType().toString(),
                room.getStatus().toString(), room.getServices().stream().map(AccommodationServiceDto::new).collect(Collectors.toList()));
    }

    @JsonIgnore
    public Room getNewRoom() {
        Room room = Room.builder()
                .roomNumber(roomNumber)
                .type(RoomType.valueOf(type))
                .rentAmount(rentAmount)
                .floor(Floor.valueOf(floor))
                .area(area)
                .status(RoomStatus.AVAILABLE)
                .services(services == null ? null : services.stream().map(AccommodationServiceDto::getAccommodationService).collect(Collectors.toList()))
                .build();
        return room;

    }

    @JsonIgnore
    public Room getRoom() {
        Room room = Room.builder()
                .id(id)
                .roomNumber(roomNumber)
                .type(type == null ? null : RoomType.valueOf(type))
                .rentAmount(rentAmount)
                .floor(floor == null ? null : Floor.valueOf(floor))
                .area(area)
                .status(status == null ? null : RoomStatus.valueOf(status))
                .services(services == null ? null : services.stream().map(AccommodationServiceDto::getAccommodationService).collect(Collectors.toList()))
                .build();
        return room;
    }

    public static RoomDto of(Room room) {
        return new RoomDto(room);
    }
}
