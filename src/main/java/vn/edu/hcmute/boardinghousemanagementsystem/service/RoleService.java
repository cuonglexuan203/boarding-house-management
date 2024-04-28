package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;

import java.util.List;

public interface RoleService {
    Role save(Role role);
    void save(List<Role> roles);

}
