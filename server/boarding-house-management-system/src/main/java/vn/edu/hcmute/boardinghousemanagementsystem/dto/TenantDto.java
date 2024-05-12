package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Address;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;

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

    public static TenantDto of(User room) {
        return new TenantDto(room);
    }
}
