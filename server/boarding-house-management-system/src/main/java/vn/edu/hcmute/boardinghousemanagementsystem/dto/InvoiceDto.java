package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Floor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.InvoiceType;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.PaymentStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record InvoiceDto(
        Long id,
        InvoiceType type,
        LocalDate invoiceDate,
        LocalDate paymentDeadline,
        Integer numberOfMonth,
        LocalDate pollingMonth,
        PaymentStatus status,
        Float surcharge,
        String surchargeReason,
        Float total,
        List<ServiceDetailDto> serviceDetails,
        String roomNumber,
        Floor floor,
        Float rentAmount
) {
    public InvoiceDto(Invoice invoice) {
        this(invoice.getId(), invoice.getType(), invoice.getInvoiceDate(),
                invoice.getPaymentDeadline(), invoice.getNumberOfMonth(),
                invoice.getPollingMonth(), invoice.getStatus(), invoice.getSurcharge(),
                invoice.getSurchargeReason(), invoice.getTotal(),
                invoice.getServiceDetails().stream()
                        .map(ServiceDetailDto::new)
                        .collect(Collectors.toList()), invoice.getRoomBooking().getRoom().getRoomNumber()
                , invoice.getRoomBooking().getRoom().getFloor(), invoice.getRoomBooking().getRoom().getRentAmount());
    }

    @JsonIgnore
    public Invoice getInvoice() {
        Invoice invoice = Invoice.builder()
                .id(id)
                .type(type)
                .invoiceDate(invoiceDate)
                .paymentDeadline(paymentDeadline)
                .numberOfMonth(numberOfMonth)
                .pollingMonth(pollingMonth)
                .status(status)
                .surcharge(surcharge)
                .surchargeReason(surchargeReason)
                .total(total)
                .serviceDetails(serviceDetails == null ? null : serviceDetails.stream().map(ServiceDetailDto::getServiceDetail).collect(Collectors.toList()))
                .build();
        return invoice;
    }

    public static InvoiceDto of(Invoice invoice){
        return new InvoiceDto(invoice);
    }
}
