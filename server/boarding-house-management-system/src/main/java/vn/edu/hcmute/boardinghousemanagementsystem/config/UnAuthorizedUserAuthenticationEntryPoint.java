package vn.edu.hcmute.boardinghousemanagementsystem.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.ErrorDetail;
import vn.edu.hcmute.boardinghousemanagementsystem.util.MapperSingleton;

import java.io.IOException;

@Component
public class UnAuthorizedUserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        ErrorDetail responseBody = new ErrorDetail();
        responseBody.setMessage("Unauthorized user: " + authException.getMessage());
        responseBody.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        responseBody.setTimestamp(System.currentTimeMillis());
        ObjectMapper mapper = MapperSingleton.getInstance();
        String jsonResponse = mapper.writeValueAsString(responseBody);
        // 401 HTTP Response
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write(jsonResponse);
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
