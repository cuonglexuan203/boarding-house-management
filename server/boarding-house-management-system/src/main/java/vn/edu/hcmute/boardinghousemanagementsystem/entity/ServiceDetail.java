package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "service_detail")
public class ServiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(0)
    @Column(name = "money")
    private float money;


    @Min(0)
    @Column(name = "old_number")
    private float oldNumber;

    @Min(0)
    @Column(name = "new_number")
    private float newNumber;

    // use: example 1, 2, 3 wifi,...
    @Min(0)
    @Column(name = "amount_of_use")
    private float use;

    // Relationships

    @ManyToOne
    private Invoice invoice;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private AccommodationService service;
}
