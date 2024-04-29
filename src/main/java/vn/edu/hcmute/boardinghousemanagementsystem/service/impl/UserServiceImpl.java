package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.UserRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@AllArgsConstructor
@Slf4j
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
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

    @Override
    public boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not  found: " + username));
        Set<String> roles = Set.of();
        Set<GrantedAuthority> ga = new HashSet<>();
        for (String role : roles) {
            ga.add(new SimpleGrantedAuthority(role));
        }
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), ga);
    }
}
