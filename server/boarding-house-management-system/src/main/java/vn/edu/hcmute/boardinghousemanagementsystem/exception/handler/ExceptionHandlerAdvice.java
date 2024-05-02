package vn.edu.hcmute.boardinghousemanagementsystem.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.ErrorDetail;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorDetail> handlerUsernameNotFoundException(UsernameNotFoundException exception) {
        ErrorDetail response = new ErrorDetail();
        response.setMessage("User not found: " + exception.getMessage());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setTimestamp(System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetail> handlerGlobalException(Exception exception) {
        ErrorDetail response = new ErrorDetail();
        response.setMessage("Internal server error: " + exception.getMessage());
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.setTimestamp(System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
