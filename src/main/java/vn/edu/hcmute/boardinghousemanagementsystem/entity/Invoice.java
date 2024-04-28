package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.InvoiceType;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.PaymentStatus;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private InvoiceType type;

    @Column(name = "invoice_date", nullable = false)
    private Date invoiceDate;

    @Column(name = "payment_deadline", nullable = false)
    private Date paymentDeadline;

    @Min(0)
    @Column(name = "number_of_month")
    private int numberOfMonth;

    @Column(name = "polling_month", nullable = false)
    private Date pollingMonth;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PaymentStatus status;

    @Column(name = "surcharge")
    private float surcharge;

    @Column(name = "surcharge_reason")
    private String surchargeReason;

    @Column(name = "total")
    private float total;

    // Relationships

    @ManyToOne(cascade = CascadeType.PERSIST)
    private RoomBooking roomBooking;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<ServiceDetail> serviceDetails;



}
