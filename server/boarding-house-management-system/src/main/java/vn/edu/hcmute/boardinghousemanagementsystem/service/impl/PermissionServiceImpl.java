package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Permission;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.PermissionRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.PermissionService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Slf4j
@Service
public class PermissionServiceImpl implements PermissionService {
    private final PermissionRepository permissionRepo;

    @Override
    public Optional<Permission> findByPermission(String permission) {
        return permissionRepo.findByPermission(permission);
    }

    @Override
    public Permission save(Permission permission) {
        if (permission == null) {
            log.error("Permission instance is null");
            return null;
        }
        return permissionRepo.save(permission);
    }

    @Override
    public void save(List<Permission> permissions) {
        if(permissions == null) {
            log.error("Permissions is null");
            return ;
        }
        permissionRepo.saveAll(permissions);

    }
}
