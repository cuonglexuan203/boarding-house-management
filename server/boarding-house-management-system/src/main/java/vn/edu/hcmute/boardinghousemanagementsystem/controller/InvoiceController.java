package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.ServiceDetailDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.InvoiceNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.ServiceDetailNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.service.InvoiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.ServiceDetailService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/api/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;
    private final ServiceDetailService serviceDetailService;

    @GetMapping
//    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<InvoiceDto> getInvoices() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String invoicename = authentication.getName();
        List<InvoiceDto> invoiceDtos;

        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            invoiceDtos = invoiceService.findAllInvoice().stream()
                    .map(InvoiceDto::new)
                    .collect(Collectors.toList());
        } else {
            invoiceDtos = invoiceService.findInvoicesByUsername(invoicename).stream()
                    .map(InvoiceDto::new)
                    .collect(Collectors.toList());
        }
        return invoiceDtos;
    }

    @PatchMapping
    public ResponseEntity<InvoiceDto> updateInvoice(@RequestBody InvoiceDto invoiceDto) {
        log.info("Receive an update invoice request: " + invoiceDto);
        //
        Long invoiceId = invoiceDto.id();
        if (invoiceId == null || invoiceId == 0) {
            log.error("Request for update invoice failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Invoice existingInvoice = invoiceService.findById(invoiceId).orElseThrow(() -> new InvoiceNotFoundException("Invoice not found by id: " + invoiceId));
        //
        updateInvoiceFields(existingInvoice, invoiceDto);
        //
        Invoice persistedInvoice = invoiceService.saveAndFlush(existingInvoice);

        // Redundant
        if (persistedInvoice == null) {
            log.error("Request for update invoice failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("Invoice updated: " + persistedInvoice);
        return ResponseEntity.status(HttpStatus.OK).body(InvoiceDto.of(persistedInvoice));
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

    @DeleteMapping("/{invoiceId}")
    public ResponseEntity deleteInvoice(@PathVariable(name = "invoiceId") Long invoiceId) {
        if (invoiceId == null || invoiceId <= 0) {
            return ResponseEntity.badRequest().build();
        }
        invoiceService.delete(invoiceId);
        return ResponseEntity.ok().build();
    }
}
