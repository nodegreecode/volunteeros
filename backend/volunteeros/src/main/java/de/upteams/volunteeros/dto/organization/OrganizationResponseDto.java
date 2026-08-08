package de.upteams.volunteeros.dto.organization;

import de.upteams.volunteeros.domain.model.Image;

import java.time.Instant;

public record OrganizationResponseDto(String id,
                                      String ownerId,
                                      String orgForm,
                                      String orgName,
                                      String registrationNumber,
                                      String description,
                                      String website,
                                      String registrationCountry,
                                      String city,
                                      String street,
                                      String phone,
                                      String email,
                                      Image avatar,
                                      int applicationsCount,
                                      Instant createdAt,
                                      Instant updatedAt) {
}
