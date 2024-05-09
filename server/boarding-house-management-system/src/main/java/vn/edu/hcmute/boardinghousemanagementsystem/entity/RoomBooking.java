package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    private Date checkInDate;

    @Column(name = "check_out_date")
    private Date checkOutDate;

    // Relationships

    @ToString.Exclude
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private User user;

    @ToString.Exclude
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Room room;

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(cascade = CascadeType.PERSIST)
    private Contract contract;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "roomBooking", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Invoice> invoices  = new ArrayList<>();
}
