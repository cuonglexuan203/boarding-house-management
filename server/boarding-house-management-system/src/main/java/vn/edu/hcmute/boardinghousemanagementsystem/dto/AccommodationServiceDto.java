package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public record AccommodationServiceDto(
        @Min(value = 0, message = "Room id must be greater than or equal to 0")
        Long id,

        @NotBlank
        String name,

        @Min(value = 0, message = "Price must be greater than or equal to 0")
        Float price,

        @NotBlank
        String unit,
        Boolean isMeteredService,
        List<Long> roomIds
) {

    @JsonIgnore
    public AccommodationServiceDto(AccommodationService accommodationService) {
        this(accommodationService.getId(), accommodationService.getName(),
                accommodationService.getPrice(), accommodationService.getUnit(), accommodationService.getIsMeteredService(),
                accommodationService.getRooms().stream().map(Room::getId).collect(Collectors.toList())
        );
    }

    @JsonIgnore
    public AccommodationService getNewAccommodationService() {
        AccommodationService accommodationService = AccommodationService.builder()
                .name(name)
                .price(price)
                .unit(unit)
                .isMeteredService(isMeteredService)
                .rooms(new ArrayList<>())
                .build();
        return accommodationService;
    }

    @JsonIgnore
    public AccommodationService getAccommodationService() {
        AccommodationService accommodationService = AccommodationService.builder()
                .id(id)
                .name(name)
                .price(price)
                .unit(unit)
                .isMeteredService(isMeteredService)
                .build();
        return accommodationService;
    }

    public static AccommodationServiceDto of(AccommodationService AccommodationService) {
        return new AccommodationServiceDto(AccommodationService);
    }
}
