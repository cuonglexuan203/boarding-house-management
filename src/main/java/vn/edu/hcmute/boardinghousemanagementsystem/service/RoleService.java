package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Optional<Role> findByRole(String role);
    Role save(Role role);
    void save(List<Role> roles);

}
