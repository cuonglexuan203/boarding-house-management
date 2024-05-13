package vn.edu.hcmute.boardinghousemanagementsystem.util;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;

@Slf4j
public class ObjectUtil {
    public static <T> T reflectNonNullField(T des, T src, Class<T> clazz) {
        if (des == null || src == null || clazz == null) {
            return null;
        }
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object srcFieldValue = field.get(src);
                if (srcFieldValue != null) {
                    field.set(des, srcFieldValue);
                }
            } catch (IllegalAccessException e) {
                log.error("Error updating room field: " + e.getMessage());
                return null;
            }
        }
        return des;
    }
}
