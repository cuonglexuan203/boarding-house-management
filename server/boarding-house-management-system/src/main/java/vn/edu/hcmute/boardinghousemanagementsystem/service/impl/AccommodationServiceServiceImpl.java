package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.AccommodationServiceRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AccommodationServiceService;

import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class AccommodationServiceServiceImpl implements AccommodationServiceService {
    private final AccommodationServiceRepository serviceRepo;

    @Override
    public AccommodationService save(AccommodationService service) {
        if (serviceRepo == null) {
            log.error("Service instance is null");
            return null;
        }
        return serviceRepo.save(service);
    }

    @Override
    public void save(List<AccommodationService> services) {
        if (serviceRepo == null) {
            log.error("Services is null");
            return;
        }
        serviceRepo.saveAll(services);
    }
}
