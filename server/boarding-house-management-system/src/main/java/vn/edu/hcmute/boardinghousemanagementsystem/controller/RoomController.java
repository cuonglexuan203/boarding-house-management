package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Floor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomStatus;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomType;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public List<RoomDto> getRooms() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println("Authentication: " + authentication);
        List<RoomDto> roomDtos;
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            roomDtos = roomService.findAllRooms().stream()
                    .map(RoomDto::new)
                    .collect(Collectors.toList());
        } else {
            roomDtos = roomService.findRoomsByUsername(username).stream()
                    .map(RoomDto::new)
                    .collect(Collectors.toList());
        }
        return roomDtos;
    }


    @PostMapping
//    @PreAuthorize("hasRole(ADMIN)")
    public ResponseEntity<RoomDto> addRoom(@RequestBody RoomDto roomDto) {
        log.info("Receive an add room request: " + roomDto);
        Room newRoom = roomDto.getNewRoom();
        Room persistedRoom = roomService.save(newRoom);
        if (persistedRoom == null) {
            log.error("Request for add new room failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        log.info("Room added: " + persistedRoom);
        return ResponseEntity.status(HttpStatus.CREATED).body(RoomDto.of(persistedRoom));
    }

    @PatchMapping
    public ResponseEntity<RoomDto> updateRoom(@RequestBody RoomDto roomDto) {
        log.info("Receive an update room request: " + roomDto);
        //
        Long roomId = roomDto.id();
        if (roomId == null || roomId == 0) {
            log.error("Request for update new room failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Room existingRoom = roomService.findById(roomId).orElseThrow(() -> new RoomNotFoundException("Room not found by id: " + roomId));
        //
        updateRoom(roomDto, existingRoom);
        //
        Room persistedRoom = roomService.save(existingRoom);

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
    public ResponseEntity deleteRoom(@PathVariable(name = "roomId") Long roomId){
        if(roomId == null || roomId <= 0){
            return ResponseEntity.badRequest().build();
        }
        roomService.delete(roomId);
        return ResponseEntity.ok().build();
    }


    public Room updateRoom(RoomDto src, Room des) {
        if (src.roomNumber() != null) {
            des.setRoomNumber(src.roomNumber());
        }
        if (src.rentAmount() != null) {
            des.setRentAmount(src.rentAmount());
        }
        if (src.area() != null) {
            des.setArea(src.area());
        }
        if (src.floor() != null) {
            des.setFloor(Floor.valueOf(src.floor()));
        }
        if (src.type() != null) {
            des.setType(RoomType.valueOf(src.type()));
        }
        if(src.status() != null) {
            des.setStatus(RoomStatus.valueOf(src.status()));
        }
        return des;
    }
}
