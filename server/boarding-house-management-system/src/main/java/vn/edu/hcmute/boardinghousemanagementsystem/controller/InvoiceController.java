package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
import vn.edu.hcmute.boardinghousemanagementsystem.service.InvoiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.ServiceDetailService;

import java.util.List;

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
        List<InvoiceDto> invoiceDtos = invoiceService.getInvoiceDtos();
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
        Invoice persistedInvoice = invoiceService.update(invoiceDto);
        // Redundant
        if (persistedInvoice == null) {
            log.error("Request for update invoice failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("Invoice updated: " + persistedInvoice);
        return ResponseEntity.status(HttpStatus.OK).body(InvoiceDto.of(persistedInvoice));
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
