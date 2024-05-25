package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Contract;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.ContractStatus;

import java.time.LocalDate;

public record ContractDto(
        Long id,
        Float depositAmount,
        Integer numberOfMember,
        LocalDate startDate,
        LocalDate endDate,
        ContractStatus status,
        TenantDto contractRepresentation,
        RoomDto room

) {
    public ContractDto(Contract contract) {
        this(contract.getId(), contract.getDepositAmount(),
                contract.getNumberOfMember(), contract.getStartDate(), contract.getEndDate(),
                contract.getStatus(), TenantDto.of( contract.getContractRepresentation()), RoomDto.of(contract.getRoomBooking().getRoom()));
    }
    @JsonIgnore
    public Contract getContract() {
        Contract contract = Contract.builder()
                .id(id)
                .depositAmount(depositAmount)
                .numberOfMember(numberOfMember)
                .startDate(startDate)
                .endDate(endDate)
                .status(status)
                .build();
        return contract;
    }

    public static ContractDto of(Contract contract) {
        return new ContractDto(contract);
    }
}