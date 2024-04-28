package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record AddressDto(String country, String city, String street) {

    @JsonCreator
    public AddressDto(@JsonProperty("country") String country,
                      @JsonProperty("city") String city,
                      @JsonProperty("street") String street) {
        this.country = country;
        this.city = city;
        this.street = street;
    }
}
