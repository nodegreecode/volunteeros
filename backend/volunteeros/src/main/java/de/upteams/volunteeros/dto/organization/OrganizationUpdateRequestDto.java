package de.upteams.volunteeros.dto.organization;

import jakarta.validation.constraints.NotBlank;


public record OrganizationUpdateRequestDto(
        @NotBlank
        String orgName,

        @NotBlank
        String orgForm,

        String city,

        String phone,

        @NotBlank
        String description,

        String website
) {
}
