package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;

import java.util.List;

public interface ServiceDetailService {
    ServiceDetail save(ServiceDetail serviceDetail);
    void save(List<ServiceDetail> serviceDetails);
}
