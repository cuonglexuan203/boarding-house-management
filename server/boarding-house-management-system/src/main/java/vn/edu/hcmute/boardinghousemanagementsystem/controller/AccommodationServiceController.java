package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AccommodationServiceDto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AccommodationServiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;


import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/services")
public class AccommodationServiceController {
    private final AccommodationServiceService accommodationServiceService;
    private final RoomService roomService;

    @GetMapping
    public List<AccommodationServiceDto> getAccommodationService() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
        List<AccommodationServiceDto> accommodationServiceDtos;

        accommodationServiceDtos = accommodationServiceService.findAll().stream()
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
    public ResponseEntity<AccommodationServiceDto> addAccommodationService(@RequestBody @Valid AccommodationServiceDto accommodationServiceDto) {
        log.info("Receive an add Service request: " + accommodationServiceDto);
        AccommodationService persistedAccommodationService = accommodationServiceService.save(accommodationServiceDto);
        if (persistedAccommodationService == null) {
            log.error("Request for add new Service failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        log.info("AccommodationService added: " + persistedAccommodationService);
        return ResponseEntity.status(HttpStatus.CREATED).body(AccommodationServiceDto.of(persistedAccommodationService));
    }

    @PatchMapping
    public ResponseEntity<AccommodationServiceDto> updateAccommodationService(@RequestBody @Valid AccommodationServiceDto accommodationServiceDto) {
        log.info("Receive an update AccommodationService request: " + accommodationServiceDto);
        //
        Long accommodationServiceId = accommodationServiceDto.id();
        if (accommodationServiceId == null || accommodationServiceId <= 0) {
            log.error("Request for update new AccommodationService failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        List<Room> rooms = accommodationServiceDto.roomIds().stream().map(i -> roomService.findById(i)
                        .orElseThrow(() -> new RoomNotFoundException("Room not found by id: " + i)))
                .collect(Collectors.toList());
       AccommodationService persistedAccommodationService = accommodationServiceService.update(accommodationServiceDto, rooms);
        // Redundant
        if (persistedAccommodationService == null) {
            log.error("Request for update new AccommodationService failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("AccommodationService updated: " + persistedAccommodationService);
        return ResponseEntity.status(HttpStatus.OK).body(AccommodationServiceDto.of(persistedAccommodationService));
    }

    @DeleteMapping("/{accommodationServiceId}")
    public ResponseEntity<String> deleteAccommodationService(@PathVariable(name = "accommodationServiceId") Long accommodationServiceId) {
        if (accommodationServiceId == null || accommodationServiceId <= 0) {
            return ResponseEntity.badRequest().build();
        }
        accommodationServiceService.delete(accommodationServiceId);
        return ResponseEntity.ok().build();
    }

}