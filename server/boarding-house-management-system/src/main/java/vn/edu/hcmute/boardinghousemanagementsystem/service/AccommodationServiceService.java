package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;

import java.util.List;

public interface AccommodationServiceService {
    AccommodationService save(AccommodationService service);
    void save (List<AccommodationService> services);
}
