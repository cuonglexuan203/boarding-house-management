package vn.edu.hcmute.boardinghousemanagementsystem.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.PhoneNumber;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null) {
            return true;
        }
        return value.matches("^\\+?\\d+$");
    }
}
