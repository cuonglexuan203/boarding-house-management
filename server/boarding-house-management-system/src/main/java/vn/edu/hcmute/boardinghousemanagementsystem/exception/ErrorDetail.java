package vn.edu.hcmute.boardinghousemanagementsystem.exception;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ErrorDetail {
    @NotNull
    private String message;

    @Size(min = 100, max = 599)
    private int status;

    @Min(100)
    private long timestamp;
}