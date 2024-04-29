package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import java.util.Date;

public record RegisterDto(
        String fullName,

        String birthday,

        String email,

        String country,

        String city,

        String street,

        String gender,

        String career,

        String idCardNumber,

        String phoneNumber,

        String username,

        String password
) {
}
