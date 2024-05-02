package vn.edu.hcmute.boardinghousemanagementsystem.dto;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;

public record ServiceDetailDto(
        Long id,
        float money,
        float oldNumber,
        float newNumber,
        float use
) {
    public ServiceDetailDto(ServiceDetail serviceDetail) {
        this(serviceDetail.getId(), serviceDetail.getMoney(),
                serviceDetail.getOldNumber(), serviceDetail.getNewNumber(),
                serviceDetail.getUse());
    }
}
