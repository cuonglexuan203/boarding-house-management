package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddContractDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.ContractDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Contract;

import java.util.List;
import java.util.Optional;

public interface ContractService {
    Optional<Contract> findById(long id);
    Contract save(Contract contract);
    void save(List<Contract> contracts);
    //
    List<ContractDto> getContractDtos();
    Contract addNewContract(AddContractDto contractInfo);
    Contract update(ContractDto contractDto);
}
