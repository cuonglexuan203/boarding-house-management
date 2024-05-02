package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
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
        int numberOfMonth,
        LocalDate pollingMonth,
        PaymentStatus status,
        float surcharge,
        String surchargeReason,
        float total,
        List<ServiceDetailDto> serviceDetails
) {
    public InvoiceDto(Invoice invoice) {
        this(invoice.getId(), invoice.getType(), invoice.getInvoiceDate(),
                invoice.getPaymentDeadline(), invoice.getNumberOfMonth(),
                invoice.getPollingMonth(), invoice.getStatus(), invoice.getSurcharge(),
                invoice.getSurchargeReason(), invoice.getTotal(),
                invoice.getServiceDetails().stream()
                        .map(ServiceDetailDto::new)
                        .collect(Collectors.toList()));
    }
}
