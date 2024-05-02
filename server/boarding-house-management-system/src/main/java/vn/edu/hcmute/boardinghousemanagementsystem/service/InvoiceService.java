package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;

import java.util.List;

public interface InvoiceService {
    List<Invoice> findAllInvoice();
    List<Invoice> findInvoicesByUsername(String username);

}
