package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import vn.edu.hcmute.boardinghousemanagementsystem.listener.ServiceDetailListener;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EntityListeners(ServiceDetailListener.class)
@Table(name = "service_detail")
public class ServiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(0)
    @Column(name = "money")
    private Float money;


    @Min(0)
    @Column(name = "old_number")
    private Float oldNumber;

    @Min(0)
    @Column(name = "new_number")
    private Float newNumber;

    // use: example 1, 2, 3 wifi,... (Default: 1 for wifi)
    @Min(0)
    @Column(name = "amount_of_use")
    private Float use;

    // Relationships
    @ToString.Exclude
    @JsonIgnore
    @ManyToOne
    private Invoice invoice;
    
    @ToString.Exclude
    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private AccommodationService service;

}
