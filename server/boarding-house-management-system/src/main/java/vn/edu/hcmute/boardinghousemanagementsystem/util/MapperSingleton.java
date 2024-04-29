package vn.edu.hcmute.boardinghousemanagementsystem.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MapperSingleton {
    private static class MapperHelper{
        private static final ObjectMapper mapper = new ObjectMapper();
        static {
            mapper.registerModule(new JavaTimeModule());
        }
    }

    public static ObjectMapper getInstance(){
        return MapperHelper.mapper;
    }
}
