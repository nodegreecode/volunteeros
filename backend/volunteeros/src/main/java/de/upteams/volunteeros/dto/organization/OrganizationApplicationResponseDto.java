package de.upteams.volunteeros.dto.organization;

public record OrganizationApplicationResponseDto(Long id,
                                                 String organizationForm,
                                                 String organizationName,
                                                 String applicationStatus,
                                                 String description,
                                                 String memberRole,
                                                 String phone,
                                                 String email,
                                                 String website,
                                                 String registrationCountry,
                                                 String city,
                                                 String street,
                                                 String registrationNumber,
                                                 String submittedAt,
                                                 String reviewedAt
) {
}


