package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationServiceDto {
    private Long id;
    private String name;
    private float price;
    private String unit;

    public AccommodationServiceDto(AccommodationService accommodationService) {
        this.id = accommodationService.getId();
        this.name = accommodationService.getName();
        this.price = accommodationService.getPrice();
        this.unit = accommodationService.getUnit();
    }
}
