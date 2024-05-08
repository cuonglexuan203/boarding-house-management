package vn.edu.hcmute.boardinghousemanagementsystem.exception;

public class RoomNotFoundException extends  RuntimeException{
    public RoomNotFoundException() {
        super();
    }

    public RoomNotFoundException(String message) {
        super(message);
    }
}
