package de.upteams.volunteeros.dto.volunteer;

import de.upteams.volunteeros.domain.enums.UserRoleType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRegistrationDto(
        @NotBlank(message = "First name is required")
        String firstName,

        @NotBlank(message = "Last name is required")
        String lastName,

        @Email(message = "Invalid email")
        @NotBlank(message = "Email is required")
        @Size(max = 254, message = "Email must not exceed 254 characters")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 4, max = 64, message = "Password must be between 4 and 64 characters")
        String password,

        @NotNull(message = "Role is required")
        UserRoleType role) {
}
