package vn.edu.hcmute.boardinghousemanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
