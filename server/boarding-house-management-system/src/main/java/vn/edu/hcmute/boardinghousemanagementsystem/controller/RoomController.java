package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDetailsDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBookingDto;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomBookingService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;

import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;
    private final RoomBookingService roomBookingService;

    @GetMapping
    public ResponseEntity<List<RoomDto>> getRooms() {

        List<RoomDto> roomDtos = roomService.getRoomDtos();
        return ResponseEntity.ok(roomDtos);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDetailsDto> getRoomDetails(@PathVariable Long roomId) {
        if (roomId == null || roomId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        RoomDetailsDto roomDetailsDto = roomService.getRoomDetailsDto(roomId);
        if (roomDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(roomDetailsDto);
    }

    @PostMapping
    public ResponseEntity<RoomDto> addRoom(@RequestBody @Valid RoomDto roomDto) {
        log.info("Receive an add room request: " + roomDto);
        Room persistedRoom = roomService.addNewRoom(roomDto);
        if (persistedRoom == null) {
            log.error("Request for add new room failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        log.info("Room added: " + persistedRoom);
        return ResponseEntity.status(HttpStatus.CREATED).body(RoomDto.of(persistedRoom));
    }

    @PatchMapping
    public ResponseEntity<RoomDto> updateRoom(@RequestBody @Valid RoomDto roomDto) {
        log.info("Receive an update room request: " + roomDto);
        //
        Long roomId = roomDto.id();
        if (roomId == null || roomId <= 0) {
            log.error("Request for update new room failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Room persistedRoom = roomService.update(roomDto);

        // Redundant
        if (persistedRoom == null) {
            log.error("Request for update new room failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("Room updated: " + persistedRoom);
        return ResponseEntity.status(HttpStatus.CREATED).body(RoomDto.of(persistedRoom));
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable(name = "roomId") Long roomId) {
        if (roomId == null || roomId <= 0) {
            return ResponseEntity.badRequest().build();
        }
        roomService.delete(roomId);
        return ResponseEntity.ok().build();
    }


}
