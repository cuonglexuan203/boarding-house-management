package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.AccommodationServiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.AccommodationServiceNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.AccommodationServiceRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AccommodationServiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class AccommodationServiceServiceImpl implements AccommodationServiceService {
    private final AccommodationServiceRepository serviceRepo;

    @Override
    public List<AccommodationService> findAll() {
        return serviceRepo.findAll();
    }

    @Override
    public Optional<AccommodationService> findById(long id) {
        if (id <= 0) {
            return Optional.empty();
        }
        return serviceRepo.findById(id);
    }


    @Override
    public AccommodationService save(AccommodationService service) {
        if (serviceRepo == null) {
            log.error("Service instance is null");
            return null;
        }
        return serviceRepo.save(service);
    }

    private boolean validateServiceInfo(AccommodationServiceDto serviceDto) {
        if (serviceDto.name() == null || !StringUtils.hasText(serviceDto.name())) {
            return false;
        }
        if (serviceDto.unit() == null || !StringUtils.hasText(serviceDto.unit())) {
            return false;
        }
        return true;
    }

    @Override
    public AccommodationService save(AccommodationServiceDto serviceDto) {
        // Validate service data
        if (!validateServiceInfo(serviceDto)) {
            return null;
        }
        //
        AccommodationService newAccommodationService = serviceDto.getNewAccommodationService();
        AccommodationService persistedAccommodationService = save(newAccommodationService);
        return persistedAccommodationService;
    }

    @Override
    public AccommodationService update(AccommodationServiceDto serviceDto, List<Room> rooms) {
        Long id = serviceDto.id();
        if (id == null || id <= 0) {
            return null;
        }
        if (rooms == null) {
            return null;
        }
        AccommodationService existingAccommodationService = findById(id).orElseThrow(() -> new AccommodationServiceNotFoundException("AccommodationService not found by id: " + id));
        existingAccommodationService.removeAllRooms();
        for (Room room : rooms) {
            existingAccommodationService.addRoom(room);
        }
        updateAccommodationService(serviceDto, existingAccommodationService);
        //
        AccommodationService persistedAccommodationService = save(existingAccommodationService);
        return persistedAccommodationService;
    }

    private AccommodationService updateAccommodationService(AccommodationServiceDto srcDto, AccommodationService des) {
        AccommodationService src = srcDto.getNewAccommodationService();
        src.setId(null);
        return ObjectUtil.reflectNonNullField(des, src, AccommodationService.class);
    }

    @Override
    public void save(List<AccommodationService> services) {
        if (serviceRepo == null) {
            log.error("Services is null");
            return;
        }
        serviceRepo.saveAll(services);
    }

    @Override
    public void delete(long id) {
        if (id <= 0) {
            return;
        }
        if (!serviceRepo.existsById(id)) {
            return;
        }
        AccommodationService accommodationService = serviceRepo.findById(id).get();
        List<ServiceDetail> serviceDetails = accommodationService.getServiceDetails();
        for (ServiceDetail serviceDetail : serviceDetails) {
            serviceDetail.setService(null);
        }
        accommodationService.getServiceDetails().removeIf(e -> true);
        serviceRepo.delete(accommodationService);
    }
}
