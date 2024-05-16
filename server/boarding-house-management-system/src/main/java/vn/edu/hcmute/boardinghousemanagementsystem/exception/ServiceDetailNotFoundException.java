package vn.edu.hcmute.boardinghousemanagementsystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ServiceDetailNotFoundException extends RuntimeException {
    public ServiceDetailNotFoundException() {
        super();
    }

    public ServiceDetailNotFoundException(String message) {
        super(message);
    }
}

