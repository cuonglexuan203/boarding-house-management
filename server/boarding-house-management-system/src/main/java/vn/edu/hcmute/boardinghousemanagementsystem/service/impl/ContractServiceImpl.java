package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Contract;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.ContractRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.ContractService;

import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class ContractServiceImpl implements ContractService {
    private final ContractRepository contractRepo;

    @Override
    public Contract save(Contract contract) {
        if (contractRepo == null) {
            log.error("Contract instance is null");
            return null;
        }
        return contractRepo.save(contract);
    }

    @Override
    public void save(List<Contract> contracts) {
        if (contractRepo == null) {
            log.error("Contracts is null");
            return;
        }
        contractRepo.saveAll(contracts);
    }
}
