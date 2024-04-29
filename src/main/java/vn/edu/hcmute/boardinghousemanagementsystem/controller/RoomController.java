package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/room")
public class RoomController {
    @GetMapping("/{userid}")
    public String getRooms(){
        return "Room response";
    }

}
