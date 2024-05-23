package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddInvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceService {
    Optional<Invoice> findById(long id);
    List<Invoice> findAllInvoice();
    List<Invoice> findInvoicesByUsername(String username);
    Invoice save(Invoice invoice);
    Invoice saveAndFlush(Invoice invoice);
    void save(List<Invoice> invoices);
    void delete(long id);
    //
    List<Invoice> getInvoices();
    List<InvoiceDto> getInvoiceDtos();
    public List<Invoice> createInvoices(Invoice newInvoice, int numberOfRooms);
    public List<Invoice> addNewInvoices(AddInvoiceDto invoiceInfo);
    Invoice update(InvoiceDto invoiceDto);

}
