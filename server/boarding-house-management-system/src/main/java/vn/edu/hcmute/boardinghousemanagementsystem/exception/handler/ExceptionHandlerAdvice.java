package vn.edu.hcmute.boardinghousemanagementsystem.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.ErrorResponse;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handler(UsernameNotFoundException exception) {
        ErrorResponse response = new ErrorResponse();
        response.setMessage("User not found: " + exception.getMessage());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setTimestamp(System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handler(Exception exception) {
        ErrorResponse response = new ErrorResponse();
        response.setMessage("Internal server error: " + exception.getMessage());
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.setTimestamp(System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
