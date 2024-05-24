package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBookingDto;

import java.util.List;

public record RoomDetailsDto(
        RoomDto room,
        List<RoomBookingDto> roomBookings,
        RoomBookingDto currentRoomBooking,
        List<AccommodationServiceDto> services,
        List<TenantDto> tenants,
        List<InvoiceDto> invoices,
        List<ContractDto> contracts

) {

}
