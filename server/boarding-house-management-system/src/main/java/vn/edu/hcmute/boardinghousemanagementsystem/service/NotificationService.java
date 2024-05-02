package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.entity.Notification;

import java.util.List;

public interface NotificationService {
    Notification save (Notification notification);
    void save (List<Notification> notifications);
}
