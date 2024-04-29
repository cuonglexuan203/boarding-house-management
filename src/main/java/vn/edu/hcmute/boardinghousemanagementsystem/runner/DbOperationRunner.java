package vn.edu.hcmute.boardinghousemanagementsystem.runner;

import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Permission;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingProcessContext;
import vn.edu.hcmute.boardinghousemanagementsystem.service.PermissionService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoleService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;

import java.util.List;
import java.util.stream.Stream;

@Profile("cuongdev")
@Order(1)
@Slf4j
@RequiredArgsConstructor
@Component
public class DbOperationRunner implements CommandLineRunner {
    @NotNull
    private final UserService userService;

    @NotNull
    private final RoleService roleService;

    @NotNull
    private final PermissionService permissionService;

    @NotNull
    private final PasswordEncoder passwordEncoder;

    @Value("classpath:data/users.json")
    private Resource userResource;

    @Value("classpath:data/roles.json")
    private Resource roleResource;

    @Value("classpath:data/permissions.json")
    private Resource permissionResource;
    //
    private List<User> users;
    private List<Role> roles;
    private List<Permission> permissions;

    @Override
    public void run(String... args) throws Exception {
        try {
            Stream<Resource> resourceStream = Stream.of(userResource, roleResource, permissionResource);
            // Deserialization
            resourceStream.map(res -> {
                        DeserializingProcessContext ctx = new DeserializingProcessContext();
                        ctx.deserialize(res);
                        return ctx.getContextValue();
                    })
                    .forEach(objectArr -> {
                        if (objectArr instanceof User[] userArr) {
                            users = List.of(userArr);
                        } else if (objectArr instanceof Role[] roleArr) {
                            roles = List.of(roleArr);
                        } else if (objectArr instanceof Permission[] permissionArr) {
                            permissions = List.of(permissionArr);
                        }
                    });
            // Mapping
            if(users == null){
                log.error("No users");
                return;
            }
            if(roles == null){
                log.error("No roles");
                return;
            }
            if(permissions == null){
                log.error("No permissions");
                return;
            }

            // Persistence
            userService.save(users);
            roleService.save(roles);
            permissionService.save(permissions);



        } catch (Exception e) {
            e.printStackTrace();
            log.error("Read preloading data failed!");
        }
    }
}
