package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private Float price;

    @NotBlank
    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name="isMeteredService", nullable = false)
    private Boolean isMeteredService;

    // Relationships

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceDetail> serviceDetails = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "services")
    private List<Room> rooms = new ArrayList<>();
//
    public void addServiceDetail(ServiceDetail serviceDetail){
        serviceDetail.setService(this);
        this.serviceDetails.add(serviceDetail);
    }
    public void removeServiceDetail(ServiceDetail serviceDetail){
        serviceDetail.setService(null);
        this.serviceDetails.remove(serviceDetail);
    }

    public void addRoom(Room room){
        room.getServices().add(this);
        this.rooms.add(room);
    }
    public void removeRoom(Room room){
        room.getServices().remove(this);
        this.rooms.add(null);
    }
    public void removeAllRooms(){
        for(Room room : rooms){
            room.getServices().remove(this);
        }
        rooms.clear();
    }
}
