package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "service")
public class AccommodationService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Min(0)
    @Column(name = "price", nullable = false)
    private float price;

    @NotBlank
    @Column(name = "unit", nullable = false)
    private String unit;

    // Relationships

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<ServiceDetail> serviceDetails;
}
