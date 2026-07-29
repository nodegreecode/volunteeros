package de.upteams.volunteeros.dto.organization;

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
                                      String avatar,
                                      int applicationsCount,
                                      Instant createdAt,
                                      Instant updatedAt) {
}
