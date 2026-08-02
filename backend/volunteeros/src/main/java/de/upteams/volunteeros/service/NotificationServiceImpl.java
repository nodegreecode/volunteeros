package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.model.Notification;
import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.enums.NotificationType;
import de.upteams.volunteeros.dto.mapping.NotificationMapper;
import de.upteams.volunteeros.dto.notification.NotificationDto;
import de.upteams.volunteeros.repository.NotificationRepository;
import de.upteams.volunteeros.service.interfaces.NotificationService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    @Override
    @Transactional
    public void create(User user, NotificationType type, String title, String message) {

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setCreatedAt(Instant.now());

        notificationRepository.save(notification);

        logger.info("Notification saved, id={}", notification.getId());
    }

    @Override
    public List<NotificationDto> getAll(String email) {
        return notificationRepository.findAllByUserEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(notificationMapper::mapEntityToNotificationDto)
                .toList();
    }

    @Override
    public List<NotificationDto> getUnread(String email) {
        return notificationRepository.findAllByUserEmailAndReadFalse(email)
                .stream()
                .map(notificationMapper::mapEntityToNotificationDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public long countUnread(String email) {
        return notificationRepository.countByUserEmailAndReadFalse(email);
    }

    @Override
    @Transactional
    public void markAsRead(Long notificationId, String email) {
        Notification notification = notificationRepository.findByIdAndUserEmail(notificationId, email)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));

        notification.setRead(true);
    }
}
