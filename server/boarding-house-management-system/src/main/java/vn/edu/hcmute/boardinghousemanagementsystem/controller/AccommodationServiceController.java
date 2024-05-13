package vn.edu.hcmute.boardinghousemanagementsystem.controller;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AccommodationServiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.AccommodationServiceNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AccommodationServiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.InvoiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Floor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomStatus;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomType;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/api/services")
public class AccommodationServiceController {
    private final AccommodationServiceService accommodationServiceService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<AccommodationServiceDto> getAccommodationService() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        List<AccommodationServiceDto> accommodationServiceDtos;

        accommodationServiceDtos = accommodationServiceService.findAllAccommodationService().stream()
                .map(AccommodationServiceDto::new)
                .collect(Collectors.toList());

//        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
//            invoiceDtos = invoiceService.findAllInvoice().stream()
//                    .map(InvoiceDto::new)
//                    .collect(Collectors.toList());
//        } else {
//            invoiceDtos = invoiceService.findInvoicesByUsername(username).stream()
//                    .map(InvoiceDto::new)
//                    .collect(Collectors.toList());
//        }
        return accommodationServiceDtos;
    }

    @PostMapping
//    @PreAuthorize("hasRole(ADMIN)")
    public ResponseEntity<AccommodationServiceDto> addAccommodationService(@RequestBody AccommodationServiceDto accommodationServiceDto) {
        log.info("Receive an add Service request: " + accommodationServiceDto);
        AccommodationService newAccommodationService = accommodationServiceDto.getNewAccommodationService();
        AccommodationService persistedAccommodationService = accommodationServiceService.save(newAccommodationService);
        if (persistedAccommodationService == null) {
            log.error("Request for add new Service failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        log.info("AccommodationService added: " + persistedAccommodationService);
        return ResponseEntity.status(HttpStatus.CREATED).body(AccommodationServiceDto.of(persistedAccommodationService));
    }

    @PatchMapping
    public ResponseEntity<AccommodationServiceDto> updateAccommodationService(@RequestBody AccommodationServiceDto accommodationServiceDto) {
        log.info("Receive an update AccommodationService request: " + accommodationServiceDto);
        //
        Long accommodationServiceId = accommodationServiceDto.id();
        if (accommodationServiceId == null || accommodationServiceId == 0) {
            log.error("Request for update new AccommodationService failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        AccommodationService existingAccommodationService = accommodationServiceService.findById(accommodationServiceId).orElseThrow(() -> new AccommodationServiceNotFoundException("AccommodationService not found by id: " + accommodationServiceId));
        //
        updateAccommodationService(accommodationServiceDto, existingAccommodationService);
        //existingAccommodationService = accommodationServiceDto.
        //
        AccommodationService persistedAccommodationService = accommodationServiceService.save(existingAccommodationService);

        // Redundant
        if (persistedAccommodationService == null) {
            log.error("Request for update new AccommodationService failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("AccommodationService updated: " + persistedAccommodationService);
        return ResponseEntity.status(HttpStatus.CREATED).body(AccommodationServiceDto.of(persistedAccommodationService));
    }

    @DeleteMapping("/{accommodationServiceId}")
    public ResponseEntity deleteAccommodationService(@PathVariable(name = "accommodationServiceId") Long accommodationServiceId){
        if(accommodationServiceId == null || accommodationServiceId <= 0){
            return ResponseEntity.badRequest().build();
        }
        accommodationServiceService.delete(accommodationServiceId);
        return ResponseEntity.ok().build();
    }


    public AccommodationService updateAccommodationService(AccommodationServiceDto src, AccommodationService des) {
        if (src.name() != null) {
            des.setName(src.name());
        }
        if (src.price()!=0) {
            des.setPrice(src.price());
        }
        if (src.unit() != null) {
            des.setUnit(src.unit());
        }
        return des;
    }
}