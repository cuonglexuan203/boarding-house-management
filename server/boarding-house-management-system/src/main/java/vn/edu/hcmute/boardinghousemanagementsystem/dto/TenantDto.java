package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Address;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.util.DateTimeUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.AvailableValues;

import java.util.List;
import java.util.stream.Collectors;

public record TenantDto(
        Long id,

        String fullName,
        @Email
        String email,
        String phoneNumber,
        String idCardNumber,
        @AvailableValues(values = {"MALE", "FEMALE", "UNKNOWN"})
        String gender,
        Address address,
        String birthday,
        String career, List<RoomDto> rooms) {
    public TenantDto(User user) {
        this(user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getIdCardNumber(),
                user.getGender().name(),
                user.getAddress(),
                user.getBirthday().toString(),
                user.getCareer(),
                user.getRoomBookings() == null ? null : user.getRoomBookings().stream()
                        .map(RoomBooking::getRoom)
                        .map(RoomDto::new).collect(Collectors.toList()));
    }

    @JsonIgnore
    public User getTenant() {
        User tenant = User.builder()
                .id(id)
                .fullName(fullName())
                .phoneNumber(phoneNumber())
                .email(email())
                .idCardNumber(idCardNumber())
                .gender(gender == null ? null : Gender.valueOf(gender))
                .address(address())
                .birthday(DateTimeUtil.toLocalDate(birthday(), "yyyy-MM-dd"))
//                .roomBookings(rooms)
                .career(career())
                .build();
        return tenant;
    }

    public static TenantDto of(User user) {
        return new TenantDto(user);
    }
}
