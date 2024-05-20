package vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.validator.AvailableValueValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Constraint(validatedBy = AvailableValueValidator.class)
public @interface AvailableValues {
    String message() default "Invalid value";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String[] values();
}
