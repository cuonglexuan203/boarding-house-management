package vn.edu.hcmute.boardinghousemanagementsystem.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @org.springframework.web.bind.annotation.ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handler(UsernameNotFoundException exception){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sorry");
    }
}
