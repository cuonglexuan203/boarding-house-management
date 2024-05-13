package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.LoginDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.LoginResponse;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RegisterDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AuthenticationService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.JwtUtil;

@AllArgsConstructor
@RestController
@RequestMapping("/auth/")
public class AuthController {
    private final AuthenticationService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("signup")
    public ResponseEntity<User> register(@RequestBody RegisterDto body){
//        User user = authService.register(body);
        return ResponseEntity.ok(null);

    }

    @PostMapping("signin")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto body){
        User user = authService.authenticate(body);
        String token = jwtUtil.generateToken(user.getUsername());
        long expiresIn = jwtUtil.getExpirationTime();
        LoginResponse loginResponse = new LoginResponse(token, expiresIn);
        return ResponseEntity.ok(loginResponse);
    }
}
