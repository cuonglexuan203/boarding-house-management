package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.*;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.*;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.AccommodationServiceNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.BusinessValidationException;
import vn.edu.hcmute.boardinghousemanagementsystem.exception.RoomNotFoundException;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.RoomRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.AccommodationServiceService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomBookingService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.RoomService;
import vn.edu.hcmute.boardinghousemanagementsystem.service.UserService;
import vn.edu.hcmute.boardinghousemanagementsystem.util.DateTimeUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.ObjectUtil;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.RoomStatus;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final UserService userService;
    private final AccommodationServiceService accommodationServiceService;

    @Override
    public Optional<Room> findById(long id) {
        if (id <= 0) {
            return Optional.empty();
        }
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }


    @Override
    public List<Room> findByUsername(String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        List<Room> rooms = new ArrayList<>();

        for (RoomBooking roomBooking : user.getRoomBookings()) {
            rooms.add(roomBooking.getRoom());
        }

        return rooms;
    }

    @Override
    public Room save(Room room) {
        if (room == null) {
            log.error("Room instance is null");
            return null;
        }
        return roomRepository.save(room);
    }

    @Override
    public void save(List<Room> rooms) {
        if (rooms == null) {
            log.error("Rooms is null");
            return;
        }
        roomRepository.saveAll(rooms);
    }

    @Override
    public void delete(long id) {
        if (id <= 0) {
            return;
        }
        if (!roomRepository.existsById(id)) {
            return;
        }
        Room room = roomRepository.findById(id).get();
        List<RoomBooking> roomBookings = room.getRoomBookings();
        for (RoomBooking roomBooking : roomBookings) {
            roomBooking.setRoom(null);
        }
        room.getRoomBookings().clear();
        //
        for (AccommodationService service : room.getServices()) {
            service.getRooms().remove(room);
        }
        room.getServices().clear();
        //
        roomRepository.delete(room);
    }

    //
    @Override
    public List<Room> getRooms() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            List<Room> rooms = findAll();
            return rooms;
        }
        List<Room> rooms = findByUsername(username);
        return rooms;
    }

    @Override
    public List<RoomDto> getRoomDtos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            List<RoomDto> roomDtos = findAll().stream().map(RoomDto::new).collect(Collectors.toList());
            return roomDtos;
        }
        List<RoomDto> roomDtos = findByUsername(username).stream().map(RoomDto::new).collect(Collectors.toList());
        return roomDtos;
    }

    @Override
    public RoomBooking getLatestRoomBookingInUse(long roomId) {
        if (roomId <= 0) {
            return null;
        }
        LocalDate now = LocalDate.now();
        Room room = findById(roomId).orElseThrow(() -> new RoomNotFoundException("Room not found with id: " + roomId));
        if (!room.getStatus().equals(RoomStatus.OCCUPIED)) {
            return null;
        }
        List<RoomBooking> roomBookings = room.getRoomBookings().stream().filter(r -> {
            Contract contract = r.getContract();
            return DateTimeUtil.isDateInRange(contract.getStartDate(), contract.getEndDate(), now);
        }).collect(Collectors.toList());
        if (roomBookings.isEmpty()) {
            return null;
        }
//        List<LocalDate>
        return roomBookings.getFirst();
    }

    @Override
    public RoomDetailsDto getRoomDetailsDto(long roomId) {
        Room room = findById(roomId).orElseThrow(() -> new RoomNotFoundException(("Room not found by id: " + roomId)));
        List<RoomBooking> roomBookings = room.getRoomBookings();
        List<AccommodationService> services = room.getServices();
        RoomBooking currentRoomBooking = getLatestRoomBookingInUse(roomId);
        if (currentRoomBooking == null) {
            RoomDetailsDto roomDetailsDto = new RoomDetailsDto(RoomDto.of(room),
                    roomBookings == null ? List.of() : roomBookings.stream().map(RoomBookingDto::of).collect(Collectors.toList()),
                    null,
                    services.stream().map(AccommodationServiceDto::of).collect(Collectors.toList()),
                    List.of(),
                    List.of(),
                    List.of());
            return roomDetailsDto;
        }
        List<User> tenants = currentRoomBooking.getUsers();
        List<Invoice> invoices = currentRoomBooking.getInvoices();
        List<ContractDto> contractDtos = roomBookings.stream().map(r -> {
            Contract contract = r.getContract();
            contract.getContractRepresentation().setRoomBookings(null);
            return ContractDto.of(r.getContract());
        }).collect(Collectors.toList());
        //
        tenants.forEach(t -> t.setRoomBookings(null));
        //
        RoomDetailsDto roomDetailsDto = new RoomDetailsDto(RoomDto.of(room),
                roomBookings.stream().map(RoomBookingDto::of).collect(Collectors.toList()),
                RoomBookingDto.of(currentRoomBooking),
                services.stream().map(AccommodationServiceDto::of).collect(Collectors.toList()),
                tenants.stream().map(TenantDto::of).collect(Collectors.toList()),
                invoices.stream().map(InvoiceDto::of).collect(Collectors.toList()),
                contractDtos
        );
        return roomDetailsDto;
    }

    @Override
    public Room addNewRoom(RoomDto roomDto) {
        // Sanitize input
        if (!StringUtils.hasText(roomDto.roomNumber())) {
            throw new BusinessValidationException("Invalid room number: " + roomDto.roomNumber());
        }
        return save(roomDto);
    }

    @Override
    public Room save(RoomDto roomDto) {
        Room newRoom = roomDto.getNewRoom();
        List<AccommodationService> managedServices = new ArrayList<>();
        for (AccommodationService service : newRoom.getServices()) {
            AccommodationService managedService;
            if (service.getId() == null) {
                return null;
            }
            managedService = accommodationServiceService.findById(service.getId())
                    .orElseThrow(() -> new AccommodationServiceNotFoundException("Service not found"));
            managedService.getRooms().add(newRoom);
            managedServices.add(managedService);
        }
        newRoom.setServices(managedServices);
        Room persistedRoom = save(newRoom);
        return persistedRoom;
    }

    @Override
    public Room update(RoomDto roomDto) {
        if (roomDto.roomNumber() != null) {
            if (!StringUtils.hasText(roomDto.roomNumber())) {
                throw new BusinessValidationException("Room number can not be empty: " + roomDto.roomNumber());
            }
        }
        //
        long id = roomDto.id();
        Room existingRoom = findById(id).orElseThrow(() -> new RoomNotFoundException("Room not found by id: " + id));
        //
        updateRoomFields(existingRoom, roomDto);
        //
        Room persistedRoom = save(existingRoom);
        return persistedRoom;
    }

    private Room updateRoomFields(Room des, RoomDto srcDto) {
        Room src = srcDto.getRoom();
        src.setId(null);
        return ObjectUtil.reflectNonNullField(des, src, Room.class);
    }
}
