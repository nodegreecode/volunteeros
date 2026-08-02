package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.Notification;
import de.upteams.volunteeros.dto.notification.NotificationDto;
import org.mapstruct.Mapper;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationDto mapEntityToNotificationDto(Notification entity);

    List<NotificationDto> mapEntityToNotificationDtoList(Collection<Notification> entities);
}
