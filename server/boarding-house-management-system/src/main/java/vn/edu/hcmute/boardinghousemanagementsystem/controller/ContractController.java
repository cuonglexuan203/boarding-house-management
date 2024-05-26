package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddContractDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddInvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.ContractDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Contract;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
import vn.edu.hcmute.boardinghousemanagementsystem.service.ContractService;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/contracts")
public class ContractController {
    private final ContractService contractService;


    @GetMapping
    public ResponseEntity<List<ContractDto>> getContracts() {
        List<ContractDto> contractDtos = contractService.getContractDtos();
        return ResponseEntity.ok(contractDtos);
    }

    @PostMapping
    public ResponseEntity<ContractDto> addContract(@RequestBody @Valid AddContractDto contractInfo) {
        log.info("Receive an add contract request: " + contractInfo);
        Contract contract = contractService.addNewContract(contractInfo);
        if (contract == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        log.info("Added new contract, size: " + contract);
        return ResponseEntity.status(HttpStatus.CREATED).body(ContractDto.of(contract));
    }

    @PatchMapping
    public ResponseEntity<ContractDto> updateContract(@RequestBody @Valid ContractDto contractDto) {
        log.info("Receive an update contract request: " + contractDto);
        //
        Long invoiceId = contractDto.id();
        if (invoiceId == null || invoiceId == 0) {
            log.error("Request for update contract failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Contract persistedContract = contractService.update(contractDto);
        // Redundant
        if (persistedContract == null) {
            log.error("Request for update contract failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("Invoice updated: " + persistedContract);
        return ResponseEntity.status(HttpStatus.OK).body(ContractDto.of(persistedContract));
    }
}
