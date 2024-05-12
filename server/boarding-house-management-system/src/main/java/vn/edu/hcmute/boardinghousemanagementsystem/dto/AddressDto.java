package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record AddressDto(String city, String district, String ward, String street) {

    @JsonCreator
    public AddressDto(@JsonProperty("city") String city,
                      @JsonProperty("district") String district,
                      @JsonProperty("ward") String ward,
                      @JsonProperty("street") String street) {
        this.city = city;
        this.district = district;
        this.ward = ward;
        this.street = street;
    }
}
