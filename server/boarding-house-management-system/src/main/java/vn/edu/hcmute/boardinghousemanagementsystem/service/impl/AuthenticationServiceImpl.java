package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.LoginDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RegisterDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.UserDto;
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
    public User register(User user) {
        if(user == null) {
            log.error("Register failed cause user is null");
            return null;
        }
        if(userService.existsByUsername(user.getUsername())){
            log.error("Username already exists");
            return null;
        }
        if(userService.existsByEmail(user.getEmail())){
            log.error("Email already exists");
            return null;
        }
        if(userService.existsByPhoneNumber(user.getPhoneNumber())){
            log.error("Phone number already exists");
            return null;
        }
        if(userService.existsByIdCardNumber(user.getIdCardNumber())){
            log.error("Id card number already exists");
            return null;
        }
        if(!StringUtils.hasText(user.getPassword())){
            log.error("Password must not be empty");
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.registerNewUser(user);
    }

    @Override
    public User register(UserDto userDto) {
        User user = userDto.getUser();
        final User persistedUser = register(user);
        return persistedUser;
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
