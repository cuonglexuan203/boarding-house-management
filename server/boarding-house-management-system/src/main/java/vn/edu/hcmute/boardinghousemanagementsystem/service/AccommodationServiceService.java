package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.AccommodationServiceDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

import java.util.List;
import java.util.Optional;

public interface AccommodationServiceService {
    List<AccommodationService> findAll();
    Optional<AccommodationService> findById(long id);
    AccommodationService save(AccommodationService service);
    void save (List<AccommodationService> services);
    void delete(long id);
    //
    AccommodationService save(AccommodationServiceDto serviceDto);
    AccommodationService update(AccommodationServiceDto serviceDto, List<Room> rooms);

}
