package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    User save(User user); // user argument: has already set roles and permissions
    void save(List<User> users); // users argument: has already set roles and permissions
    User registerNewUser(User user); // default: ROLE_USER
    User registerNewUser(User user, List<String> extrasPermissions); // default: ROLE_USER
    User registerNew(User user, List<Role> roles);
    User registerNew(User user, List<Role> roles, List<String> extrasPermissions);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByIdCardNumber(String idCardNumber);

}
