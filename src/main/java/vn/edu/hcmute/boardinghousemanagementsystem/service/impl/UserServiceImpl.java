package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
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
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private UserRepository userRepo;


    @Override
    public Optional<User> findByUsername(String username) {
        return Optional.empty();
    }

    @Override
    public User save(User user) {
        if(user != null){
            return userRepo.save(user);
        }
        return null;
    }

    @Override
    public void save(List<User> users) {
        if(users != null){
            userRepo.saveAll(users);
        }
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
