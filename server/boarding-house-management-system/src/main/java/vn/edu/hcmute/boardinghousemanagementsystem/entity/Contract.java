package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.ContractStatus;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(0)
    @Column(name = "deposit_amount", nullable = false)
    private Float depositAmount;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Min(1)
    @Column(name = "number_of_member")
    private Integer numberOfMember;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ContractStatus status;

    // Relationships

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(mappedBy = "contract", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private RoomBooking roomBooking;

    @ToString.Exclude
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private User contractRepresentation;

    //
    public void addRoomBooking(RoomBooking roomBooking){
        roomBooking.setContract(this);
        this.roomBooking = roomBooking;
    }

    public void addContractRepresentation(User contractRepresentation){
        contractRepresentation.getContracts().add(this);
        this.contractRepresentation = contractRepresentation;
    }
    public void removeContractRepresentation(User contractRepresentation){
        contractRepresentation.getContracts().remove(this);
        this.contractRepresentation = null;
    }

}
