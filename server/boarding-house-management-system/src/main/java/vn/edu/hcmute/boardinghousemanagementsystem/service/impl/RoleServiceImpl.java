package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoleRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoleService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Slf4j
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepo;

    @Override
    public Optional<Role> findByRole(String role) {
        return roleRepo.findByRole(role);
    }

    @Override
    public List<Role> findAll() {
        return roleRepo.findAll();
    }

    @Override
    public Role save(Role role) {
        if(roleRepo == null){
            log.error("Role instance is null");
            return null;
        }
        return roleRepo.save(role);
    }

    @Override
    public void save(List<Role> roles) {
        if(roles == null){
            log.error("Roles is null");
            return;
        }
        roleRepo.saveAll(roles);
    }
}
