package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;

public record AccommodationServiceDto(
        Long id,
        String name,
        float price,
        String unit,
        boolean isMeteredService
) {

    @JsonIgnore
    public AccommodationServiceDto(AccommodationService accommodationService) {
        this(accommodationService.getId(), accommodationService.getName(),
                accommodationService.getPrice(), accommodationService.getUnit(), accommodationService.isMeteredService());
    }

    @JsonIgnore
    public AccommodationService getNewAccommodationService() {
        AccommodationService accommodationService = AccommodationService.builder()
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
