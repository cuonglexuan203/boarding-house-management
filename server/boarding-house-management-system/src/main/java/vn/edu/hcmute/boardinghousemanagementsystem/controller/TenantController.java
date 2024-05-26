package vn.edu.hcmute.boardinghousemanagementsystem.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.TenantDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.UserDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AuthenticationService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;

import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/tenants")
public class TenantController {

    private final UserService userService;
    private final AuthenticationService authService;

    @GetMapping
    public ResponseEntity<List<TenantDto>> getTenants() {
        List<TenantDto> tenantDtos = userService.getTenantDtos();
        return ResponseEntity.ok(tenantDtos);
    }

    @PostMapping
//    @PreAuthorize("hasRole(ADMIN)")
    public ResponseEntity<TenantDto> addTenant(@RequestBody @Valid UserDto userDto) {
        // Note: new user id must be null
        log.info("Receive an add tenant request: " + userDto);
        User persistedTenant = authService.register(userDto);
        if (persistedTenant == null) {
            log.error("Request for add new room failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        log.info("Tenant added: " + persistedTenant);
        return ResponseEntity.status(HttpStatus.CREATED).body(TenantDto.of(persistedTenant));
    }

    @PatchMapping
    public ResponseEntity<TenantDto> updateTenant(@RequestBody @Valid TenantDto tenantDto) {
        log.info("Receive an update room request: " + tenantDto);
        //
        Long tenantId = tenantDto.id();
        if (tenantId == null || tenantId == 0) {
            log.error("Request for update tenant failed");
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        User persistedUser = userService.updateTenant(tenantDto);

        // Redundant
        if (persistedUser == null) {
            log.error("Request for update tenant failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //
        log.info("Tenant updated: " + persistedUser);
        return ResponseEntity.status(HttpStatus.OK).body(TenantDto.of(persistedUser));
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity deleteTenant(@PathVariable(name = "userId") Long userId) {
        if (userId == null || userId <= 0) {
            return ResponseEntity.badRequest().build();
        }
        userService.delete(userId);
        return ResponseEntity.ok().build();
    }
}
