package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.databind.util.StdConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddressDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Address {

    @NotBlank
    @Column(name = "country", nullable = false)
    private String country;

    @NotBlank
    @Column(name = "city", nullable = false)
    private String city;

    @NotBlank
    @Column(name = "street", nullable = false)
    private String street;

    //

    public static class AddressConverter extends StdConverter<AddressDTO, Address> {
        @Override
        public Address convert(AddressDTO value) {
            Address address = new Address();
            address.setCountry(value.country());
            address.setCity(value.city());
            address.setStreet(value.street());
            return address;
        }
    }
}
