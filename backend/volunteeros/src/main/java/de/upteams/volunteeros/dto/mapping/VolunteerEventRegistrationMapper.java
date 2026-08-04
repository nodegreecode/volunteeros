package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.VolunteerEventRegistration;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VolunteerEventRegistrationMapper {

    @Mapping(source = "event.id", target = "eventId")
    @Mapping(source = "volunteer.id", target = "volunteerId")
    VolunteerEventRegistrationResponseDto mapEntityToVolunteerEventRegistrationResponseDto(VolunteerEventRegistration entity);

    @Mapping(source = "id", target = "registrationId")
    @Mapping(source = "volunteer.userProfile.firstName", target = "volunteerFirstname")
    @Mapping(source = "volunteer.userProfile.lastName", target = "volunteerLastname")
    VolunteerCheckInResponseDto mapEntityToVolunteerCheckInResponseDto(VolunteerEventRegistration entity);
}
