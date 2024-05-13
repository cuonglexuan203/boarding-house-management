package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;

public record AccommodationServiceDto(
        Long id,
        String name,
        float price,
        String unit
) {
    public AccommodationServiceDto(AccommodationService accommodationService) {
        this(accommodationService.getId(), accommodationService.getName(),
                accommodationService.getPrice(), accommodationService.getUnit());
    }
    
    public AccommodationService getNewAccommodationService(){
        AccommodationService accommodationService = AccommodationService.builder()
                .name(name)
                .price(price)
                .unit(unit)
                .build();
        return accommodationService;
    }

    public static AccommodationServiceDto of(AccommodationService AccommodationService) {
        return new AccommodationServiceDto(AccommodationService);
    }
}
