package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
}
