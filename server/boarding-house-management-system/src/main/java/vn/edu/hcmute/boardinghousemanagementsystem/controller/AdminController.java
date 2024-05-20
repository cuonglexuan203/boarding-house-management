package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/admin")
public class AdminController {
    @GetMapping
    public ResponseEntity<String> getRooms(){
        return ResponseEntity.ok( "Admin:Rooms response");
    }
}
