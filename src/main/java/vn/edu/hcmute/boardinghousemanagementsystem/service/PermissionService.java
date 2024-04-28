package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Permission;

import java.util.List;

public interface PermissionService {
    Permission save(Permission permission);
    void save(List<Permission> permissions);
}
