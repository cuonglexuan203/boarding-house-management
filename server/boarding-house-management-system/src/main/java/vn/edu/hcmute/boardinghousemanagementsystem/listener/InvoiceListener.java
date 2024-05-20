package vn.edu.hcmute.boardinghousemanagementsystem.listener;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;

public class InvoiceListener {

    @PrePersist
    @PreUpdate
    public void calculateTotal(Invoice invoice) {
        invoice.calculateTotal();
    }
}
