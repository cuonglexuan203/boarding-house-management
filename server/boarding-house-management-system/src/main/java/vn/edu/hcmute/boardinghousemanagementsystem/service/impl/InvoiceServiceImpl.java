package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddInvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.*;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.InvoiceNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.ServiceDetailNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.InvoiceRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.InvoiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomBookingService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.PaymentStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final UserService userService;
    private final RoomService roomService;

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
    public Invoice saveAndFlush(Invoice invoice) {
        if (invoiceRepository == null) {
            log.error("Invoice instance is null");
            return null;
        }
        return invoiceRepository.saveAndFlush(invoice);
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

    @Override
    public List<Invoice> getInvoices() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            List<Invoice> invoiceDtos = findAllInvoice();
            return invoiceDtos;
        }
        List<Invoice> invoiceDtos = findInvoicesByUsername(username);
        return invoiceDtos;
    }

    @Override
    public List<InvoiceDto> getInvoiceDtos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            List<InvoiceDto> invoiceDtos = findAllInvoice().stream().map(InvoiceDto::new).collect(Collectors.toList());
            return invoiceDtos;
        }
        List<InvoiceDto> invoiceDtos = findInvoicesByUsername(username).stream().map(InvoiceDto::new).collect(Collectors.toList());
        return invoiceDtos;
    }

    @Override
    public List<Invoice> createInvoices(Invoice newInvoice, int numberOfRooms) {
        // Sanitize newInvoice

        // Init basic infor for new invoice
        newInvoice.setId(null);
        newInvoice.setStatus(PaymentStatus.UNPAID);
        // clone an invoice for each room in rooms
        List<Invoice> invoices = new ArrayList<>();
        for (int i = 0; i < numberOfRooms; i++) {
            invoices.add(newInvoice.deepClone());
        }
        return invoices;
    }

    @Override
    public List<Invoice> addNewInvoices(AddInvoiceDto invoiceInfo) {
        Invoice newInvoice = invoiceInfo.invoice().getInvoice();
        if (newInvoice == null || invoiceInfo.roomIds() == null) {
            return List.of();
        }
        int numberOfRooms = invoiceInfo.roomIds().size();
        if (numberOfRooms == 0) {
            return List.of();
        }
//
        List<Invoice> invoices = createInvoices(newInvoice, numberOfRooms);
        List<RoomBooking> roomBookings = invoiceInfo.roomIds().stream().map(roomService::getLatestRoomBookingInUse).collect(Collectors.toList());
        for (int i = 0; i < numberOfRooms; i++) {
            RoomBooking roomBooking = roomBookings.get(i);
            if(roomBooking == null){
                continue;
            }
            List<AccommodationService> services = roomBooking.getRoom().getServices();
            Invoice invoice = invoices.get(i);
            if (invoice.getServiceDetails() == null) {
                invoice.setServiceDetails(new ArrayList<>());
            }
            if (!services.isEmpty()) {
                services.forEach(s -> {
                    ServiceDetail serviceDetail = ServiceDetail.builder()
                            .money(0f)
                            .newNumber(0f)
                            .oldNumber(0f)
                            .use(0f)
                            .build();
                    serviceDetail.setService(s);
                    invoice.addServiceDetail(serviceDetail);
                });
            }
            roomBooking.addInvoice(invoice);
        }
        save(invoices);
        return invoices;
    }

    @Override
    public Invoice update(InvoiceDto invoiceDto) {
        long id = invoiceDto.id();
        Invoice existingInvoice = findById(id).orElseThrow(() -> new InvoiceNotFoundException("Invoice not found by id: " + id));
        //
        updateInvoiceFields(existingInvoice, invoiceDto);
        //
        Invoice persistedInvoice = saveAndFlush(existingInvoice);
        return persistedInvoice;
    }

    public Invoice updateInvoiceFields(Invoice des, InvoiceDto srcDto) {
        Invoice src = srcDto.getInvoice();
        if (srcDto.serviceDetails() != null) {
            List<ServiceDetail> serviceDetails = src.getServiceDetails();
            for (ServiceDetail serviceDetail : serviceDetails) {
                ServiceDetail existingServiceDetail = des.getServiceDetails().stream()
                        .filter(sd -> sd.getId().equals(serviceDetail.getId()))
                        .findFirst()
                        .orElseThrow(() -> new ServiceDetailNotFoundException("Service detail not found by id: " + serviceDetail.getId()));
                ObjectUtil.reflectNonNullField(existingServiceDetail, serviceDetail, ServiceDetail.class);
            }
            src.setServiceDetails(null);
        }
        return ObjectUtil.reflectNonNullField(des, src, Invoice.class);

    }
}
