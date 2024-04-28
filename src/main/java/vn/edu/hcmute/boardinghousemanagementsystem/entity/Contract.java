package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.ContractStatus;

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
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Min(1)
    @Column(name = "number_of_member")
    private int numberOfMember;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ContractStatus status;

    // Relationships

    @OneToOne(mappedBy = "contract", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private RoomBooking roomBooking;

}
