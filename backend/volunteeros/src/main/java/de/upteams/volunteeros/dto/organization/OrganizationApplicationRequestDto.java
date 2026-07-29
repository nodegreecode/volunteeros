package de.upteams.volunteeros.dto.organization;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record OrganizationApplicationRequestDto(Long userId,
                                                String organizationForm,
                                                String organizationName,
                                                String description,
                                                String memberRole,
                                                String phone,

                                                @Email(message = "Invalid email")
                                                @NotBlank(message = "Email is required")
                                                @Size(max = 254, message = "Email must not exceed 254 characters")
                                                String email,
                                                String website,

                                                @NotBlank(message = "Registration country is required")
                                                @Pattern(
                                                        regexp = "^[A-Z]{2}$",
                                                        message = "Registration country must be a valid ISO 3166-1 alpha-2 country code"
                                                )
                                                String registrationCountry,
                                                String city,
                                                String street,
                                                String registrationNumber) {
}

