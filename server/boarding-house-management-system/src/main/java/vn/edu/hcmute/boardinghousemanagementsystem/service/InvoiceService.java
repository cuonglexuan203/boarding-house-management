package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceService {
    Optional<Invoice> findById(long id);
    List<Invoice> findAllInvoice();
    List<Invoice> findInvoicesByUsername(String username);
    Invoice save(Invoice invoice);
    void save(List<Invoice> invoices);
    void delete(long id);

}
