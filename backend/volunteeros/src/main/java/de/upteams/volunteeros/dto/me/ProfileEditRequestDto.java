package de.upteams.volunteeros.dto.me;

public record ProfileEditRequestDto(String firstName,
                                    String lastName,
                                    String city,
                                    String phone,
                                    String bio) {
}
