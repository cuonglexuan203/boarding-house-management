package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

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
    Invoice save(InvoiceDto invoiceDto);
    Invoice update(InvoiceDto invoiceDto);

}
