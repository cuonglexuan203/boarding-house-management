package vn.edu.hcmute.boardinghousemanagementsystem.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.AvailableValues;

import java.util.Arrays;
import java.util.List;

public class AvailableValueValidator implements ConstraintValidator<AvailableValues, String> {
    List<String> availableValues;

    @Override
    public void initialize(AvailableValues constraintAnnotation) {
        availableValues = Arrays.asList(constraintAnnotation.values());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        return availableValues.contains(value);
    }
}
