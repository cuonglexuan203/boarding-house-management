package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import vn.edu.hcmute.boardinghousemanagementsystem.listener.InvoiceListener;
import vn.edu.hcmute.boardinghousemanagementsystem.util.IDeepCloneable;
import vn.edu.hcmute.boardinghousemanagementsystem.util.MapperSingleton;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.InvoiceType;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.PaymentStatus;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EntityListeners(InvoiceListener.class)
@Table(name = "invoice")
public class Invoice implements IDeepCloneable<Invoice> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private InvoiceType type;

    @Column(name = "invoice_date", nullable = false)
    private LocalDate invoiceDate;

    @Column(name = "payment_deadline", nullable = false)
    private LocalDate paymentDeadline;

    @Min(0)
    @Column(name = "number_of_month")
    private Integer numberOfMonth;

    @Column(name = "polling_month", nullable = false)
    private LocalDate pollingMonth;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PaymentStatus status;

    @Column(name = "surcharge")
    private Float surcharge;

    @Column(name = "surcharge_reason")
    private String surchargeReason;

    @Column(name = "total")
    private Float total;

    // Relationships

    @ToString.Exclude
    @JsonIgnore
    @ManyToOne
    private RoomBooking roomBooking;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceDetail> serviceDetails = new ArrayList<>();

    // Methods
    public void calculateTotal() {
        float roomCharge = this.numberOfMonth * (this.roomBooking != null && this.roomBooking.getRoom() != null ? this.roomBooking.getRoom().getRentAmount() : 0);
        this.total = serviceDetails.stream().map(ServiceDetail::getMoney).reduce(roomCharge, Float::sum) + surcharge;
    }

    public void addServiceDetail(ServiceDetail serviceDetail) {
        serviceDetail.setInvoice(this);
        this.serviceDetails.add(serviceDetail);
    }

    @Override
    public Invoice deepClone() {
        ObjectMapper mapper = MapperSingleton.getInstance();
        try {
            String json = mapper.writeValueAsString(this);
            return mapper.readValue(json, Invoice.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to clone Invoice object", e);
        }

    }
}
