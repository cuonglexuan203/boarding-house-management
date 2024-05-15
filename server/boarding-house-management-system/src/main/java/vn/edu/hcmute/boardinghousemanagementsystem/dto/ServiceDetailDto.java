package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;

public record ServiceDetailDto(
        Long id,
        float money,
        float oldNumber,
        float newNumber,
        float use,
        Long serviceId
) {
    public ServiceDetailDto(ServiceDetail serviceDetail) {
        this(serviceDetail.getId(), serviceDetail.getMoney(),
                serviceDetail.getOldNumber(), serviceDetail.getNewNumber(),
                serviceDetail.getUse(), serviceDetail.getService().getId());
    }
}
