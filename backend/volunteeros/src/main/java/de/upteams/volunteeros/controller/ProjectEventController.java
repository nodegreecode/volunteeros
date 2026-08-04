package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.project.ProjectEventCreatedResponseDto;
import de.upteams.volunteeros.dto.projectevent.ProjectEventUpdateRequestDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import de.upteams.volunteeros.service.interfaces.ProjectEventService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project-events")
public class ProjectEventController {

    private final ProjectEventService projectEventService;

    public ProjectEventController(ProjectEventService projectEventService) {
        this.projectEventService = projectEventService;
    }

    @PatchMapping({"/{eventId}"})
    public ProjectEventCreatedResponseDto editEvent(@PathVariable Long eventId, @RequestBody ProjectEventUpdateRequestDto requestDto, Authentication authentication) {
        return projectEventService.editEvent(eventId, requestDto, authentication.getName());
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

}
