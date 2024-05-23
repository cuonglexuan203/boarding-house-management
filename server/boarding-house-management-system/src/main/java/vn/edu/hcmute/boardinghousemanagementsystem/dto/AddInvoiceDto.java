package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;

import java.util.List;

public record AddInvoiceDto(InvoiceDto invoice,
                            List<Long> roomIds) {
}
