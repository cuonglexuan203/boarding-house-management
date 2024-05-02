package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Contract;

import java.util.List;

public interface ContractService {
    Contract save(Contract contract);
    void save(List<Contract> contracts);
}
