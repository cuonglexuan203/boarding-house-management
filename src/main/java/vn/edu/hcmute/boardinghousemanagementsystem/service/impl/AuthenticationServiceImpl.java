package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.LoginDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RegisterDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Address;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AuthenticationService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@Slf4j
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Override
    public User signUp(RegisterDto input) {
        User user = User.builder()
                .fullName(input.fullName())
                .email(input.email())
                .address(new Address(input.country(), input.city(), input.street()))
                .gender(Gender.valueOf(input.gender()))
                .birthday(LocalDate.parse(input.birthday()))
                .career(input.career())
                .phoneNumber(input.phoneNumber())
                .idCardNumber(input.idCardNumber())
                .username(input.username())
                .password(passwordEncoder.encode(input.password()))
                .build();
        if(userService.existsByUsername(input.username())){
            log.error("User already exists");
            return null;
        }
        return userService.save(user);
    }

    @Override
    public User authenticate(LoginDto input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                input.username(),
                input.password()
        ));

        return userService.findByUsername(input.username()).orElseThrow();

    }
}
