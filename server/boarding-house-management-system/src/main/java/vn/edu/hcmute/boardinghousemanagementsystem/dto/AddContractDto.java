package vn.edu.hcmute.boardinghousemanagementsystem.dto;

public record AddContractDto(
        ContractDto contract,
        UserDto contractRepresentation,
        long roomId

) {

}
