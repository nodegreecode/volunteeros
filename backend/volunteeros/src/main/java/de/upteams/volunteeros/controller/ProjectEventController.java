package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.project.ProjectEventCreatedResponseDto;
import de.upteams.volunteeros.dto.projectevent.ProjectEventUpdateRequestDto;
import de.upteams.volunteeros.dto.response.DataResponse;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import de.upteams.volunteeros.service.interfaces.ProjectEventService;
import de.upteams.volunteeros.service.interfaces.VolunteerEventRegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-events")
public class ProjectEventController {

    private final ProjectEventService projectEventService;
    private final VolunteerEventRegistrationService volunteerEventRegistrationService;

    public ProjectEventController(ProjectEventService projectEventService, VolunteerEventRegistrationService volunteerEventRegistrationService) {
        this.projectEventService = projectEventService;
        this.volunteerEventRegistrationService = volunteerEventRegistrationService;
    }

    @PatchMapping({"/{eventId}"})
    public ProjectEventCreatedResponseDto editEvent(@PathVariable Long eventId, @RequestBody ProjectEventUpdateRequestDto requestDto, Authentication authentication) {
        return projectEventService.editEvent(eventId, requestDto, authentication.getName());
    }

    @PatchMapping({"/{eventId}/start-check-in"})
    public ProjectEventCreatedResponseDto startCheckIn(@PathVariable Long eventId, Authentication authentication) {
        return projectEventService.startCheckIn(eventId, authentication.getName());
    }

    @PatchMapping({"/{eventId}/start"})
    public ProjectEventCreatedResponseDto startEvent(@PathVariable Long eventId, Authentication authentication) {
        return projectEventService.startEvent(eventId, authentication.getName());
    }

    @PatchMapping({"/{eventId}/cancel"})
    public ProjectEventCreatedResponseDto cancelEvent(@PathVariable Long eventId, Authentication authentication) {
        return projectEventService.cancelEvent(eventId, authentication.getName());
    }

    @PatchMapping({"/{eventId}/complete"})
    public ProjectEventCreatedResponseDto completeEvent(@PathVariable Long eventId, Authentication authentication) {
        return projectEventService.completeEvent(eventId, authentication.getName());
    }

    @PostMapping({"/{eventId}/registrations"})
    public VolunteerEventRegistrationResponseDto register(@PathVariable Long eventId, Authentication authentication) {
        return projectEventService.register(eventId, authentication.getName());
    }

    @GetMapping({"/{eventId}/registration"})
    public ResponseEntity<DataResponse<VolunteerEventRegistrationResponseDto>> qetRegistration(@PathVariable Long eventId, Authentication authentication) {
        return ResponseEntity.ok(new DataResponse<>(volunteerEventRegistrationService.qetRegistration(eventId, authentication.getName())));
    }

    @GetMapping("/{eventId}")
    public ProjectEventCreatedResponseDto getEvent(@PathVariable Long eventId) {
        return projectEventService.getProjectEvent(eventId);
    }

    @GetMapping("/{eventId}/registrations")
    public List<VolunteerEventRegistrationResponseDto> getEventRegistrations(@PathVariable Long eventId) {
        return projectEventService.getAllProjectEventRegistrations(eventId);
    }

}
