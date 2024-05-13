package vn.edu.hcmute.boardinghousemanagementsystem.exception;

public class AccommodationServiceNotFoundException extends RuntimeException{
    public AccommodationServiceNotFoundException() {
        super();
    }

    public AccommodationServiceNotFoundException(String message) {
        super(message);
    }
}
