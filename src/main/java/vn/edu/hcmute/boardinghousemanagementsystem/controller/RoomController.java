package vn.edu.hcmute.boardinghousemanagementsystem.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<RoomDto> getRooms() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        //String username = principal.getName();
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            // Admin users get all rooms
            return roomService.findAllRooms();
        } else {
            // Other authenticated users get only rooms they have booked
            return roomService.findRoomsByUsername(username);
        }
    }
}
