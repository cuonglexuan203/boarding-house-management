package vn.edu.hcmute.boardinghousemanagementsystem.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Notification;
import vn.edu.hcmute.boardinghousemanagementsystem.repo.NotificationRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.service.NotificationService;

import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepo;
    @Override
    public Notification save(Notification notification) {
        if(notificationRepo == null){
            log.error("Notification instance is null");
            return null;
        }
        return notificationRepo.save(notification);
    }

    @Override
    public void save(List<Notification> notifications) {
        if(notifications == null){
            log.error("Notifications is null");
            return;
        }
        notificationRepo.saveAll(notifications);
    }

}
