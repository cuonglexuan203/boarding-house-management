package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.ServiceDetailRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.ServiceDetailService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Slf4j
@Service
public class ServiceDetailServiceImpl implements ServiceDetailService {
    private final ServiceDetailRepository serviceDetailRepo;

    @Override
    public Optional<ServiceDetail> findById(long id) {
        if(id <= 0) {
            log.error("Service detail not found: " + id);
            return Optional.empty();
        }
        return serviceDetailRepo.findById(id);
    }

    @Override
    public ServiceDetail save(ServiceDetail serviceDetail) {
        if(serviceDetailRepo == null){
            log.error("ServiceDetail instance is null");
            return null;
        }
        return serviceDetailRepo.save(serviceDetail);
    }

    @Override
    public void save(List<ServiceDetail> serviceDetails) {
        if(serviceDetails == null){
            log.error("ServiceDetails is null");
            return;
        }
        serviceDetailRepo.saveAll(serviceDetails);
    }
}
