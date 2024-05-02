package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Optional<Role> findByRole(String role);
    List<Role> findAll();
    Role save(Role role);
    void save(List<Role> roles);

}
