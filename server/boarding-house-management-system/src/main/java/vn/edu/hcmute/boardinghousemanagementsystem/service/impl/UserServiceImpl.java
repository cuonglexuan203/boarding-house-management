package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.TenantDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.UserDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.*;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.BusinessValidationException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.PermissionNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoleNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoleRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.UserRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AuthenticationService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.PermissionService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoleService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepo;

    private final RoleService roleService;

    private final PermissionService permissionService;

    //

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public Optional<User> findById(long id) {
        if (id <= 0) {
            return Optional.empty();
        }
        return userRepo.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Override
    public User save(User user) {
        if (user == null) {
            log.error("User instance is null");
            return null;
        }
        return userRepo.save(user);
    }

    @Override
    public void save(List<User> users) {
        if (users == null) {
            log.error("Users is null");
            return;
        }
        userRepo.saveAll(users);
    }


    public Role getUserRole(){
        final String USER_ROLE = "ROLE_USER";
        return roleService.findByRole(USER_ROLE).orElseThrow(() -> new RoleNotFoundException("Role not found: " + USER_ROLE));
    }

    @Override
    public User registerNewUser(User user) {
        if (user == null) {
            log.error("User instance is null");
            return null;
        }
        Role userRole = getUserRole();
        user.setRoles(List.of(userRole));
        userRole.getUsers().add(user);
        return save(user);
    }

    @Override
    public User registerNewUser(User user, List<String> extrasPermissions) {
        if (user == null || extrasPermissions == null) {
            log.error("User instance or extras permissions can not be null");
            return null;
        }
        //
        Role userRole = getUserRole();
        user.setRoles(List.of(userRole));
        userRole.getUsers().add(user);
        //
        List<Permission> permissions = getExistingPermissions(extrasPermissions);
        for (Permission permission : permissions) {
            permission.getUsers().add(user);
        }
        user.setPermissions(permissions);
        return save(user);
    }

    @Override
    public User registerNew(User user, List<Role> roles) {
        if (user == null || roles == null) {
            log.error("User instance or roles can not be null");
            return null;
        }
        //
        user.setRoles(roles);
        for (Role role : roles) {
            role.getUsers().add(user);
        }
        //
        return save(user);
    }

    @Override
    public User registerNew(User user, List<Role> roles, List<String> extrasPermissions) {
        if (user == null || roles == null || extrasPermissions == null) {
            log.error("User instance or roles or extras permissions can not be null");
            return null;
        }
        //
        user.setRoles(roles);
        for (Role role : roles) {
            role.getUsers().add(user);
        }
        //
        List<Permission> permissions = getExistingPermissions(extrasPermissions);
        for (Permission permission : permissions) {
            permission.getUsers().add(user);
        }
        user.setPermissions(permissions);
        return save(user);
    }

    private List<Permission> getExistingPermissions(List<String> permissionStrings) {
        return permissionStrings.stream()
                .map(permission -> permissionService
                        .findByPermission(permission)
                        .orElseThrow(() -> new PermissionNotFoundException("Permission not found: " + permission))
                )
                .toList();
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public boolean existsByPhoneNumber(String phoneNumber) {
        return userRepo.existsByPhoneNumber(phoneNumber);
    }

    @Override
    public boolean existsByIdCardNumber(String idCardNumber) {
        return userRepo.existsByIdCardNumber(idCardNumber);
    }

    @Override
    public void delete(long userId) {
        if(userId <= 0){
            throw new BusinessValidationException("User id must be greater than 0");
        }
        if(!userRepo.existsById(userId)){
            throw new BusinessValidationException("User not found: " + userId);
        }
        //
        User user = userRepo.findById(userId).get();
        for(RoomBooking roomBooking: user.getRoomBookings()) {
            roomBooking.getUsers().remove(user);
        }
        user.getRoomBookings().clear();
        for(Notification notification: user.getNotifications()){
            notification.setUser(null);
        }
        user.getNotifications().clear();
        for(Role role: user.getRoles()){
            role.getUsers().remove(user);
        }
        user.getRoles().clear();
        for(Permission permission: user.getPermissions()){
            permission.getUsers().remove(user);
        }
        user.getPermissions().clear();
        userRepo.delete(user);
    }

    @Override
    public List<TenantDto> getTenantDtos() {
        List<TenantDto> tenantDtos = findAll().stream().map(TenantDto::new).toList();
        return tenantDtos;
    }

    @Override
    public User updateTenant(TenantDto tenantDto) {
        long id = tenantDto.id();
        User existingUser = findById(id).orElseThrow(() -> new UsernameNotFoundException("Tenant not found by id: " + id));
        //
        updateTenantFields(existingUser, tenantDto);
        //
        User persistedUser = save(existingUser);
        return persistedUser;
    }

    private User updateTenantFields(User des, TenantDto srcDto) {
        User src = srcDto.getTenant();
        return ObjectUtil.reflectNonNullField(des, src, User.class);
    }


    // UserDetailsService

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not  found: " + username));
        List<Role> roles = user.getRoles();
        List<GrantedAuthority> ga = getGrantedAuthorities(getAuthorities(roles));
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), ga);
    }

    private List<String> getAuthorities(List<Role> roles) {
        List<String> permissions = getPermissions(roles);
        for (Role role : roles) {
            String roleName = role.getRole();
            permissions.add(roleName);
        }
        return permissions; // Sample: {"ROLE_USER", "READ_PRIVILEGE", "CREATE_PRIVILEGE"}
    }

    private List<String> getPermissions(List<Role> roles) {
        if (roles == null) {
            return List.of();
        }
        return roles
                .stream()
                .flatMap(role -> role
                        .getPermissions()
                        .stream()
                        .map(Permission::getPermission))
                .collect(Collectors.toList()); // Sample: {"READ_PRIVILEGE", "CREATE_PRIVILEGE"}
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> permissions) {
        return permissions.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }
}
