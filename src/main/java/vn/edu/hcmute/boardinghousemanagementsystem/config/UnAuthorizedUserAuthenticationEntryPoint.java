package vn.edu.hcmute.boardinghousemanagementsystem.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;

@Component
public class UnAuthorizedUserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // 404 HTTP Response
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized user" + authException.getMessage());
    }

    @ExceptionHandler(value = {AccessDeniedException.class})
    public void commence(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exception) throws IOException {
        // 403 HTTP Response
        response.sendError(HttpServletResponse.SC_FORBIDDEN, "You don't have permission to do that: " + exception.getMessage());
    }

    @ExceptionHandler(value = {Exception.class})
    public void commence(HttpServletRequest request, HttpServletResponse response, Exception exception) throws IOException {
        // 500 HTTP Response
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal Server Error: " + exception.getMessage());
    }
}
