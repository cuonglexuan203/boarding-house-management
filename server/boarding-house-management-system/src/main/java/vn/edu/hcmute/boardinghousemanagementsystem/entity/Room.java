package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Floor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomStatus;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomType;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "rent_amount", nullable = false)
    private Float rentAmount;

    @NotBlank
    @Column(name = "room_number", nullable = false, unique = true)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "floor", nullable = false)
    private Floor floor;

    @Min(0)
    @Column(name = "area", nullable = false)
    private Float area;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private RoomType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RoomStatus status;

    // Relationships

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.MERGE, orphanRemoval = true)
    private List<RoomBooking> roomBookings = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "room_service",
            joinColumns = @JoinColumn(name = "room_fk"),
            inverseJoinColumns = @JoinColumn(name = "service_fk")
    )
    private List<AccommodationService> services = new ArrayList<>();
    //
    public boolean removeRoomBooking(long roomBookingId) {
        return roomBookings.removeIf(i -> {
            if (i.getId() == roomBookingId) {
                i.setRoom(null);
                return true;
            }
            return false;
        });
    }
    public void addService(AccommodationService service) {
        service.getRooms().add(this);
        this.services.add(service);
    }
    public void removeService(AccommodationService service) {
        service.getRooms().remove(this);
        this.services.remove(service);
    }
    public void addRoomBooking(RoomBooking roomBooking) {
        roomBooking.setRoom(this);
        this.roomBookings.add(roomBooking);
    }
    public void removeRoomBooking(RoomBooking roomBooking) {
        roomBooking.setRoom(null);
        this.roomBookings.remove(roomBooking);
    }
}
