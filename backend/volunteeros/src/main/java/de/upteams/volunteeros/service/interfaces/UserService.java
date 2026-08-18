package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    MeResponseDto getProfile(String email);

    MeResponseDto editProfile(String email, ProfileEditRequestDto requestDto);

    void uploadUserImage(String email, MultipartFile file);
}
