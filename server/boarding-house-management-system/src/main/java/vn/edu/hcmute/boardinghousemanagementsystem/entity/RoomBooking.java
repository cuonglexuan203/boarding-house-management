package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "room_booking")
public class RoomBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    // Relationships

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "room_booking_user",
            joinColumns = @JoinColumn(name = "room_booking_fk"),
            inverseJoinColumns = @JoinColumn(name = "user_fk"))
    private List<User> users = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    private Room room;

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(cascade = {CascadeType.MERGE})
    private Contract contract;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "roomBooking", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    private List<Invoice> invoices = new ArrayList<>();
//
    public void addUser(User user) {
        user.getRoomBookings().add(this);
        this.users.add(user);
    }
    public void removeUser(User user) {
        user.getRoomBookings().remove(this);
        this.users.remove(user);
    }
    public void addInvoice(Invoice invoice) {
        invoice.setRoomBooking(this);
        this.invoices.add(invoice);
    }
    public void removeInvoice(Invoice invoice) {
        invoice.setRoomBooking(null);
        this.invoices.remove(invoice);
    }
}
