package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.TenantDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.DateTimeUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;

import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/api/tenants")
public class TenantController {

    private final UserService userService;
    @GetMapping
    public ResponseEntity<List<TenantDto>> getTenants(){
        List<User> tenants = userService.findAll();
        List<TenantDto> sanitizedTenants = tenants.stream().map(TenantDto::new).toList();
        return ResponseEntity.ok(sanitizedTenants);
    }

    @PostMapping
//    @PreAuthorize("hasRole(ADMIN)")
    public ResponseEntity<TenantDto> addRoom(@RequestBody TenantDto tenantDto) {
        // Validate input
        //
        log.info("Receive an add tenant request: " + tenantDto);
        User newTenant = tenantDto.getTenant();
        User persistedTenant = userService.save(newTenant);
        if (persistedTenant == null) {
            log.error("Request for add new room failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        log.info("Tenant added: " + persistedTenant);
        return ResponseEntity.status(HttpStatus.CREATED).body(TenantDto.of(persistedTenant));
    }

    @PatchMapping
    public ResponseEntity<TenantDto> updateTenant(@RequestBody TenantDto tenantDto) {
        log.info("Receive an update room request: " + tenantDto);
        //
        Long tenantId = tenantDto.id();
        if (tenantId == null || tenantId == 0) {
            log.error("Request for update tenant failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        User existingUser = userService.findById(tenantId).orElseThrow(() -> new UsernameNotFoundException("Tenant not found by id: " + tenantId));
        //
        updateTenant(tenantDto, existingUser);
        //
        User persistedUser = userService.save(existingUser);

        // Redundant
        if (persistedUser == null) {
            log.error("Request for update tenant failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("Tenant updated: " + persistedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(TenantDto.of(persistedUser));
    }

    public User updateTenant(TenantDto src, User des) {
        if (src.fullName() != null) {
            des.setFullName(src.fullName());
        }
        if (src.email() != null) {
            des.setEmail(src.email());
        }
        if (src.phone() != null) {
            des.setPhoneNumber(src.phone());
        }
        if (src.idCardNumber() != null) {
            des.setIdCardNumber(src.idCardNumber());
        }
        if (src.gender() != null) {
            des.setGender(Gender.valueOf(src.gender()));
        }
        if(src.address() != null) {
            des.setAddress(src.address());
        }
        if(src.birthday() != null) {
            des.setBirthday(DateTimeUtil.toLocalDate(src.birthday(), "yyyy-MM-dd"));
        }
        if(src.career() != null) {
            des.setCareer(src.career());
        }
        return des;
    }
}
