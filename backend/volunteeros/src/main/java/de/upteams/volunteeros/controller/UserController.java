package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.service.interfaces.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public MeResponseDto me(Authentication authentication) {
        return userService.getProfile(authentication.getName());
    }

    @PatchMapping("/profile")
    public MeResponseDto editMyProfile(Authentication authentication, @RequestBody ProfileEditRequestDto requestDto) {
        return userService.editProfile(authentication.getName(), requestDto);
    }

    @PostMapping("/profile/image")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadImage(@RequestParam MultipartFile image, Authentication authentication) {
        userService.uploadUserImage(authentication.getName(), image);
    }

}
