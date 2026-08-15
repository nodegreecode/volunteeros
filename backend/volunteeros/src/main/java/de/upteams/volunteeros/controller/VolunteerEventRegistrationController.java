package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.project.ProjectEventCreatedResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInRequestDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationQRCodeResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import de.upteams.volunteeros.service.interfaces.VolunteerEventRegistrationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/event-registrations")
public class VolunteerEventRegistrationController {

    private final VolunteerEventRegistrationService volunteerEventRegistrationService;

    public VolunteerEventRegistrationController(VolunteerEventRegistrationService volunteerEventRegistrationService) {
        this.volunteerEventRegistrationService = volunteerEventRegistrationService;
    }

    @PatchMapping({"/{registrationId}/cancel"})
    public VolunteerEventRegistrationResponseDto cancel(@PathVariable Long registrationId, Authentication authentication) {
        return volunteerEventRegistrationService.cancel(registrationId, authentication.getName());
    }

    @GetMapping({"/{eventId}"})
    public VolunteerEventRegistrationResponseDto qetRegistration(@PathVariable Long eventId, Authentication authentication) {
        return volunteerEventRegistrationService.qetRegistration(eventId, authentication.getName());
    }

    @GetMapping({"/{registrationId}/qr"})
    public VolunteerEventRegistrationQRCodeResponseDto qrCode(@PathVariable Long registrationId, Authentication authentication) {
        /* <img src="data:image/png;base64,{qrCodeBase64}"> */
        return volunteerEventRegistrationService.qrCode(registrationId, authentication.getName());
    }

    @PatchMapping({"/{registrationId}/no-show"})
    public VolunteerEventRegistrationResponseDto noShow(@PathVariable Long registrationId, Authentication authentication) {
        return volunteerEventRegistrationService.noShow(registrationId, authentication.getName());
    }

    @PostMapping({"/check-in"})
    public VolunteerCheckInResponseDto checkIn(@RequestBody VolunteerCheckInRequestDto requestDto, Authentication authentication) {
        return volunteerEventRegistrationService.checkIn(requestDto.qrToken(), authentication.getName());
    }


}
