package vn.edu.hcmute.boardinghousemanagementsystem.listener;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.ServiceDetail;


public class ServiceDetailListener {
    @PrePersist
    @PreUpdate
    private void calculateMoney(ServiceDetail serviceDetail) {
        if(serviceDetail.getService() == null){
            return;
        }
        final float unitPrice = serviceDetail.getService().getPrice();
        if (serviceDetail.getService().getIsMeteredService()) {
            serviceDetail.setMoney((serviceDetail.getNewNumber() - serviceDetail.getOldNumber()) * unitPrice);
        } else {
            serviceDetail.setMoney((serviceDetail.getUse() * unitPrice));
        }
        if (serviceDetail.getInvoice() != null) {
            serviceDetail.getInvoice().calculateTotal();
        }
    }
}
