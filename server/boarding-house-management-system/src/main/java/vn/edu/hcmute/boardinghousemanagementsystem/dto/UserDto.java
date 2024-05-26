package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import org.springframework.util.StringUtils;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Address;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.util.DateTimeUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.AvailableValues;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.Numeric;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.PhoneNumber;

import java.util.List;
import java.util.stream.Collectors;

public record UserDto(Long id,
                      String fullName,

                      @Email
                      String email,

                      @PhoneNumber
                      String phoneNumber,

                      @Numeric
                      String idCardNumber,

                      @AvailableValues(values = {"MALE", "FEMALE", "UNKNOWN"})
                      String gender,

                      Address address,

                      String birthday,
                      String career,
                      String username,
                      String password,
                      List<RoomDto> rooms) {
    public UserDto(User user) {
        this(user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getIdCardNumber(),
                user.getGender().name(),
                user.getAddress(),
                user.getBirthday().toString(),
                user.getCareer(),
                user.getUsername(),
                user.getPassword(),
                user.getRoomBookings().stream()
                        .map(RoomBooking::getRoom)
                        .map(RoomDto::new).collect(Collectors.toList()));
    }

    @JsonIgnore
    public User getNewUser() {
        User user = User.builder()
                .fullName(fullName())
                .phoneNumber(phoneNumber())
                .email(email())
                .idCardNumber(idCardNumber())
                .gender(gender == null ? null : Gender.valueOf(gender))
                .address(address())
                .birthday(DateTimeUtil.toLocalDate(birthday(), "yyyy-MM-dd"))
                .career(career())
                .username(username)
                .password(password)
                .build();
        return user;
    }

    @JsonIgnore
    public User getUser() {
        User user = User.builder()
                .id(id)
                .fullName(fullName())
                .phoneNumber(phoneNumber())
                .email(email())
                .idCardNumber(idCardNumber())
                .gender(gender == null ? null : Gender.valueOf(gender))
                .address(address())
                .birthday(DateTimeUtil.toLocalDate(birthday(), "yyyy-MM-dd"))
                .career(career())
                .username(username)
                .password(password)
                .build();
        return user;
    }

    public static UserDto of(User user) {
        return new UserDto(user);
    }
}