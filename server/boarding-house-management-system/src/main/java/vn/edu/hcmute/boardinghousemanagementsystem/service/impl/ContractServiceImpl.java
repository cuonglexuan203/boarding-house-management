package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AddContractDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.ContractDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.InvoiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RoomDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.*;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.InvoiceNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.ContractRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.ContractService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomBookingService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class ContractServiceImpl implements ContractService {
    private final ContractRepository contractRepo;
    private final RoomService roomService;
    private final UserService userService;
    private final RoomBookingService roomBookingService;

    @Override
    public Contract save(Contract contract) {
        if (contract == null) {
            log.error("Contract instance is null");
            return null;
        }
        return contractRepo.save(contract);
    }

    @Override
    public void save(List<Contract> contracts) {
        if (contracts == null) {
            log.error("Contracts is null");
            return;
        }
        contractRepo.saveAll(contracts);
    }

    @Override
    public List<ContractDto> getContractDtos() {
        List<ContractDto> contractDtos = contractRepo.findAll().stream().map(contract -> {
            contract.getContractRepresentation().setRoomBookings(null);
            return ContractDto.of(contract);
        }).collect(Collectors.toList());

        return contractDtos;
    }

    @Override
    public Contract addNewContract(AddContractDto contractInfo) {
        ContractDto contractDto = contractInfo.contract();
        long roomId = contractInfo.roomId();
        if (contractDto == null || roomId <= 0) {
            return null;
        }
        Contract contract = contractDto.getContract();
        Room room = roomService.findById(roomId).orElseThrow(() -> new RoomNotFoundException("Room not found by id " + roomId));
        if (room.getStatus().equals(RoomStatus.OCCUPIED)) {
            return null;
        }
        User tenant = contractInfo.contractRepresentation().getUser();
        if (tenant.getId() != null && tenant.getId() > 0) {
            tenant = userService.findById(tenant.getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        }else {
            tenant.setContracts(new ArrayList<>());
            tenant.setRoomBookings(new ArrayList<>());
        }
        userService.save(tenant);
        RoomBooking newRoomBooking = new RoomBooking();
        newRoomBooking.setUsers(new ArrayList<>());
        roomBookingService.save(newRoomBooking);
        //
        room.setStatus(RoomStatus.OCCUPIED);
        room.addRoomBooking(newRoomBooking);
        contract.addRoomBooking(newRoomBooking);
        contract.addContractRepresentation(tenant);
        newRoomBooking.addUser(tenant);
//        roomService.save(room);
        userService.save(tenant);
//        roomBookingService.save(newRoomBooking);
        //
        return contract;
    }

    @Override
    public Optional<Contract> findById(long id) {
        if (id <= 0) {
            return Optional.empty();
        }
        return contractRepo.findById(id);
    }

    @Override
    public Contract update(ContractDto contractDto) {
        long id = contractDto.id();
        Contract existingContract = findById(id).orElseThrow(() -> new EntityNotFoundException("Contract not found by id: " + id));
        updateContractFields(existingContract, contractDto);
        Contract persistedContract = save(existingContract);
        return persistedContract;
    }

    private Contract updateContractFields(Contract des, ContractDto srcDto) {
        Contract src = srcDto.getContract();
        src.setId(null);
        return ObjectUtil.reflectNonNullField(des, src, Contract.class);
    }

}
