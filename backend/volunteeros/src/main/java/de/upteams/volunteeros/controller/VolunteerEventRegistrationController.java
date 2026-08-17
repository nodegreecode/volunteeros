package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.project.ProjectEventCreatedResponseDto;
import de.upteams.volunteeros.dto.response.DataResponse;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInRequestDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationQRCodeResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import de.upteams.volunteeros.service.interfaces.VolunteerEventRegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancel(@PathVariable Long registrationId, Authentication authentication) {
        volunteerEventRegistrationService.cancel(registrationId, authentication.getName());
    }

    @GetMapping({"/{registrationId}/qr"})
    public VolunteerEventRegistrationQRCodeResponseDto qrCode(@PathVariable Long registrationId, Authentication authentication) {
        /* <img src="data:image/png;base64,{qrCodeBase64}"> */
        return volunteerEventRegistrationService.qrCode(registrationId, authentication.getName());
    }

    @PatchMapping({"/{registrationId}/no-show"})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void noShow(@PathVariable Long registrationId, Authentication authentication) {
        volunteerEventRegistrationService.noShow(registrationId, authentication.getName());
    }

    @PostMapping({"/check-in"})
    public VolunteerCheckInResponseDto checkIn(@RequestBody VolunteerCheckInRequestDto requestDto, Authentication authentication) {
        return volunteerEventRegistrationService.checkIn(requestDto.qrToken(), authentication.getName());
    }


}
