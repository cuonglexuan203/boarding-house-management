package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Permission;

import java.util.List;
import java.util.Optional;

public interface PermissionService {
    Optional<Permission> findByPermission(String permission);
    Permission save(Permission permission);
    void save(List<Permission> permissions);
}
