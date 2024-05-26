package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.LoginDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RegisterDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.UserDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.*;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.BusinessValidationException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AuthenticationService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomBookingService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.DateTimeUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final RoomService roomService;

    @Override
    public User register(User user) {
        if (user == null) {
            log.error("Register failed cause user is null");
            return null;
        }
        if (userService.existsByUsername(user.getUsername())) {
            log.error("Username already exists");
            return null;
        }
        if (userService.existsByEmail(user.getEmail())) {
            log.error("Email already exists");
            return null;
        }
        if (userService.existsByPhoneNumber(user.getPhoneNumber())) {
            log.error("Phone number already exists");
            return null;
        }
        if (userService.existsByIdCardNumber(user.getIdCardNumber())) {
            log.error("Id card number already exists");
            return null;
        }
        if (!StringUtils.hasText(user.getPassword())) {
            log.error("Password must not be empty");
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.registerNewUser(user);
    }


    private boolean validateUserInfo(UserDto userDto) {
        if (userDto.fullName() == null || !StringUtils.hasText(userDto.fullName())) {
            return false;
        }
        if (userDto.email() == null || !StringUtils.hasText(userDto.email())) {
            return false;
        }
        if (userDto.phoneNumber() == null || !StringUtils.hasText(userDto.phoneNumber())) {
            return false;
        }
        if (userDto.idCardNumber() == null || !StringUtils.hasText(userDto.idCardNumber())) {
            return false;
        }
        if (userDto.address() == null) {
            return false;
        }
        if (userDto.birthday() == null || !StringUtils.hasText(userDto.birthday())) {
            return false;
        }
        if (userDto.career() == null || !StringUtils.hasText(userDto.career())) {
            return false;
        }
        if (userDto.username() == null || !StringUtils.hasText(userDto.username())) {
            return false;
        }
        if (userDto.password() == null || !StringUtils.hasText(userDto.password())) {
            return false;
        }
        if(userDto.rooms() == null || userDto.rooms().isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public User register(UserDto userDto) {
        // Validate new user info
        if (!validateUserInfo(userDto)) {
            return null;
        }
        //
        List<Long> roomIds = userDto.rooms().stream().map(RoomDto::id).collect(Collectors.toList());
        List<RoomBooking> roomBookings = roomIds.stream().map(roomService::getLatestRoomBookingInUse).collect(Collectors.toList());
        if (roomBookings.isEmpty()) {
            throw new BusinessValidationException("No any room booking");
        }
        User user = userDto.getUser();
        user.setRoomBookings(new ArrayList<>());
        for (RoomBooking roomBooking : roomBookings) {
            user.addRoomBooking(roomBooking);
        }
        ;
        final User persistedUser = register(user);
        return persistedUser;
    }

    @Override
    public User authenticate(@Valid LoginDto input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                input.username(),
                input.password()
        ));

        return userService.findByUsername(input.username()).orElseThrow();

    }
}
