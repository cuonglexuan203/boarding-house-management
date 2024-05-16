package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;

import java.util.List;
import java.util.Optional;

public interface ServiceDetailService {
    Optional<ServiceDetail> findById(long id);
    ServiceDetail save(ServiceDetail serviceDetail);
    void save(List<ServiceDetail> serviceDetails);
}
