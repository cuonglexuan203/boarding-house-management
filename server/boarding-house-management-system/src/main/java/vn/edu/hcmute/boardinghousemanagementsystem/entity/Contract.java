package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.ContractStatus;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(0)
    @Column(name = "deposit_amount", nullable = false)
    private float depositAmount;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Min(1)
    @Column(name = "number_of_member")
    private int numberOfMember;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ContractStatus status;

    // Relationships

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(mappedBy = "contract", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private RoomBooking roomBooking;

    //
    public void addRoomBooking(RoomBooking roomBooking){
        roomBooking.setContract(this);
        this.roomBooking = roomBooking;
    }

}
