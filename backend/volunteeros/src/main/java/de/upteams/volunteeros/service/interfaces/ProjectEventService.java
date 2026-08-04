package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.project.ProjectEventCreateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectEventCreatedResponseDto;
import de.upteams.volunteeros.dto.projectevent.ProjectEventUpdateRequestDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;

import java.util.List;

public interface ProjectEventService {

    ProjectEventCreatedResponseDto createEvent(Long projectId, ProjectEventCreateRequestDto requestDto);

    List<ProjectEventCreatedResponseDto> getProjectEventsByProject(Long projectId);

    List<ProjectEventCreatedResponseDto> getUpcomingProjectEventsByProject(Long projectId);

    ProjectEventCreatedResponseDto editEvent(Long eventId, ProjectEventUpdateRequestDto requestDto, String email);

    ProjectEventCreatedResponseDto cancelEvent(Long eventId, String email);

    ProjectEventCreatedResponseDto completeEvent(Long eventId, String email);

    VolunteerEventRegistrationResponseDto register(Long eventId, String email);
}
