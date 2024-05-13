package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Address;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.util.DateTimeUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;

import java.util.List;
import java.util.stream.Collectors;

public record TenantDto(Long id, String fullName, String email,
                        String phone, String idCardNumber, String gender,
                        Address address, String birthday, String career, List<RoomDto> rooms) {
    public TenantDto(User attachedUser) {
        this(attachedUser.getId(),
                attachedUser.getFullName(),
                attachedUser.getEmail(),
                attachedUser.getPhoneNumber(),
                attachedUser.getIdCardNumber(),
                attachedUser.getGender().name(),
                attachedUser.getAddress(),
                attachedUser.getBirthday().toString(),
                attachedUser.getCareer(),
                attachedUser.getRoomBookings().stream()
                        .map(RoomBooking::getRoom)
                        .map(RoomDto::new).collect(Collectors.toList()));
    }

    public User getTenant(){
        User newTenant = User.builder()
                .fullName(fullName())
                .phoneNumber(phone())
                .email(email())
                .idCardNumber(idCardNumber())
                .gender(gender == null ? null : Gender.valueOf(gender))
                .address(address())
                .birthday(birthday == null ? null : DateTimeUtil.toLocalDate(birthday(), "yyyy-MM-dd"))
                .career(career())
                .username(idCardNumber)
                .password("123456")
                .build();
        return newTenant;
    }

    public static TenantDto of(User room) {
        return new TenantDto(room);
    }
}
