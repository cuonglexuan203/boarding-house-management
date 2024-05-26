package vn.edu.hcmute.boardinghousemanagementsystem.exception;

public class BusinessValidationException extends  RuntimeException{
    public BusinessValidationException() {
    }

    public BusinessValidationException(String message) {
        super(message);
    }
}
