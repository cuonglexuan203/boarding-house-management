package vn.edu.hcmute.boardinghousemanagementsystem.util.enums;

import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

public enum RoomType {
    SINGLE,
    DOUBLE,
    TRIPLE,
    UNSPECIFIED,
    UNKNOWN;

    public static String[] getValues(){
        return Arrays.stream(values()).map(Enum::toString).toArray(String[]::new);
    }



}
