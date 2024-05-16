package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.*;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.InvoiceRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.InvoiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Slf4j
@Service
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final UserService userService;

    @Override
    public Optional<Invoice> findById(long id) {
        if (id <= 0) {
            log.error("Invoice not found: " + id);
            return Optional.empty();
        }
        return invoiceRepository.findById(id);
    }

    @Override
    public List<Invoice> findAllInvoice() {
        return invoiceRepository.findAll();
    }

    @Override
    public List<Invoice> findInvoicesByUsername(String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        List<Invoice> invoices = new ArrayList<>();

        for (RoomBooking roomBooking : user.getRoomBookings()) {
            invoices = roomBooking.getInvoices();
        }

        return invoices;
    }

    @Override
    public Invoice save(Invoice invoice) {
        if (invoiceRepository == null) {
            log.error("Invoice instance is null");
            return null;
        }
        return invoiceRepository.save(invoice);
    }

    @Override
    public void save(List<Invoice> invoices) {
        if (invoiceRepository == null) {
            log.error("Invoices is null");
            return;
        }
        invoiceRepository.saveAll(invoices);
    }

    @Override
    public void delete(long id) {
        if (id <= 0) {
            return;
        }
        if (!invoiceRepository.existsById(id)) {
            return;
        }
//
        Invoice invoice = invoiceRepository.findById(id).get();
        invoice.getRoomBooking().getInvoices().remove(invoice);
        invoice.setRoomBooking(null);
        for (ServiceDetail serviceDetail : invoice.getServiceDetails()) {
            serviceDetail.setInvoice(null);
        }
        invoice.getServiceDetails().clear();
//
        invoiceRepository.save(invoice);
        invoiceRepository.deleteById(invoice.getId());
    }
}
