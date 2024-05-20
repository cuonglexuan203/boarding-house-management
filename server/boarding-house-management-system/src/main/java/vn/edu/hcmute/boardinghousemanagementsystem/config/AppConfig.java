package vn.edu.hcmute.boardinghousemanagementsystem.config;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoleNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoleRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoleService;

import java.util.List;

@AllArgsConstructor
@Configuration
@Slf4j
public class AppConfig {

    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
        return auth.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public RoleHierarchy roleHierarchy(@Value("${app.roles.hierarchy:}") List<String> roles){
        RoleHierarchyImpl roleHierarchyImpl = new RoleHierarchyImpl();
        String hierarchy = String.join("\n", roles);
        roleHierarchyImpl.setHierarchy(hierarchy);
        return roleHierarchyImpl;
    }

    @Bean
    public DefaultWebSecurityExpressionHandler customWebSecurityExpressionHandler(RoleHierarchy roleHierarchy){
        DefaultWebSecurityExpressionHandler customWebSecurityExpressionHandler = new DefaultWebSecurityExpressionHandler();
        customWebSecurityExpressionHandler.setRoleHierarchy(roleHierarchy);
        return customWebSecurityExpressionHandler;
    }


}
