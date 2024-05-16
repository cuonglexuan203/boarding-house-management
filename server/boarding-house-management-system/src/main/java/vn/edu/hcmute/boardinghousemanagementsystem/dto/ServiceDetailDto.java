package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;

public record ServiceDetailDto(
        Long id,
        Float money,
        Float oldNumber,
        Float newNumber,
        Float use,
        Long serviceId
) {
    public ServiceDetailDto(ServiceDetail serviceDetail) {
        this(serviceDetail.getId(), serviceDetail.getMoney(),
                serviceDetail.getOldNumber(), serviceDetail.getNewNumber(),
                serviceDetail.getUse(), serviceDetail.getService().getId());
    }

    @JsonIgnore
    public ServiceDetail getServiceDetail(){
        ServiceDetail serviceDetail = ServiceDetail.builder()
                .id(id)
                .oldNumber(oldNumber)
                .newNumber(newNumber)
                .use(use)
                .build();
        return serviceDetail;
    }
}
