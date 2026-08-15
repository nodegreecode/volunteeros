package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.VolunteerEventRegistration;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface VolunteerEventRegistrationMapper {

    @Mapping(source = "event.id", target = "eventId")
    @Mapping(source = "volunteer.userProfile.firstName", target = "volunteerFirstname")
    @Mapping(source = "volunteer.userProfile.lastName", target = "volunteerLastname")
    VolunteerEventRegistrationResponseDto mapEntityToVolunteerEventRegistrationResponseDto(VolunteerEventRegistration entity);

    List<VolunteerEventRegistrationResponseDto> mapEntityToVolunteerEventRegistrationResponseDtoList(Collection<VolunteerEventRegistration> entities);

    @Mapping(source = "id", target = "registrationId")
    @Mapping(source = "volunteer.userProfile.firstName", target = "volunteerFirstname")
    @Mapping(source = "volunteer.userProfile.lastName", target = "volunteerLastname")
    VolunteerCheckInResponseDto mapEntityToVolunteerCheckInResponseDto(VolunteerEventRegistration entity);
}
