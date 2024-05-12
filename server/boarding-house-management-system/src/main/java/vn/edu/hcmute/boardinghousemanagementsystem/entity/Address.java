package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.databind.util.StdConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddressDto;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Address {

    @NotBlank
    @Column(name = "city", nullable = false)
    private String city; // city/province

    @NotBlank
    @Column(name = "district", nullable = false)
    private String district;

    @NotBlank
    @Column(name = "ward", nullable = false)
    private String ward;

    @NotBlank
    @Column(name = "street", nullable = false)
    private String street;

    //

    public static class AddressConverter extends StdConverter<AddressDto, Address> {
        @Override
        public Address convert(AddressDto value) {
            Address address = new Address();
            address.setCity(value.city());
            address.setDistrict(value.district());
            address.setWard(value.ward());
            address.setStreet(value.street());
            return address;
        }
    }
}
