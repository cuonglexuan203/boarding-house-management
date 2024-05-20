package vn.edu.hcmute.boardinghousemanagementsystem.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import vn.edu.hcmute.boardinghousemanagementsystem.validation.annotation.Numeric;

public class NumericValidator implements ConstraintValidator<Numeric, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null){
            return true;
        }
        return value.matches("\\d+");
    }
}
