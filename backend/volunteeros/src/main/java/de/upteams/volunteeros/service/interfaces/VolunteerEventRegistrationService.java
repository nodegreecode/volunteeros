package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationQRCodeResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import org.springframework.web.bind.annotation.PathVariable;

public interface VolunteerEventRegistrationService {

    void cancel(Long registrationId, String email);

    VolunteerEventRegistrationResponseDto qetRegistration(Long registrationId, String email);

    VolunteerEventRegistrationQRCodeResponseDto qrCode(Long registrationId, String email);

    VolunteerCheckInResponseDto checkIn(String qrToken, String email);

    void noShow(Long registrationId, String email);

}
