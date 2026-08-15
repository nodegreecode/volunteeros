package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.enums.ImageFolder;
import de.upteams.volunteeros.domain.model.Image;
import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.model.UserProfile;
import de.upteams.volunteeros.domain.model.UserRole;
import de.upteams.volunteeros.dto.image.ImageUploadResponseDto;
import de.upteams.volunteeros.dto.mapping.ProfileMapper;
import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.ProfileEditResponseDto;

import de.upteams.volunteeros.exceptions.types.PhoneAlreadyExistsException;
import de.upteams.volunteeros.exceptions.types.UserImageUploadException;
import de.upteams.volunteeros.repository.*;
import de.upteams.volunteeros.service.interfaces.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final ProfileMapper profileMapper;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    public UserServiceImpl(UserRepository userRepository, UserProfileRepository userProfileRepository, ProfileMapper profileMapper, ImageService imageService, ImageRepository imageRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.profileMapper = profileMapper;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
    }

    @Override
    public MeResponseDto getProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        UserProfile userProfile = user.getUserProfile();

        return new MeResponseDto(
                user.getId(),
                userProfile.getFirstName(),
                userProfile.getLastName(),
                user.getEmail(),
                user.getRoles()
                        .stream()
                        .map(UserRole::getRole)
                        .toList(),
                userProfile.getCity(),
                userProfile.getPhone(),
                userProfile.getImage(),
                userProfile.getBio(),
                userProfile.getCreatedAt(),
                userProfile.getUpdatedAt());
    }

    @Override
    @Transactional
    public ProfileEditResponseDto editProfile(String email, ProfileEditRequestDto requestDto) {

        Objects.requireNonNull(requestDto, "requestDto cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found{}", email);
            return new EntityNotFoundException("User not found");
        });

        UserProfile userProfile = user.getUserProfile();

        String newPhone = requestDto.phone();

        if (newPhone != null
                && !newPhone.equals(userProfile.getPhone())
                && userProfileRepository.existsByPhone(newPhone)) {
            throw new PhoneAlreadyExistsException("Phone number already in use");
        }

        profileMapper.updateEntityFromDto(requestDto, userProfile);
        userProfile.setUpdatedAt(Instant.now());
        return profileMapper.mapEntityToProfileEditResponseDto(userProfile);
    }

    @Override
    @Transactional
    public void uploadUserImage(String email, MultipartFile file) {

        Objects.requireNonNull(file, "Image cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found{}", email);
            return new EntityNotFoundException("User not found");
        });

        UserProfile userProfile = user.getUserProfile();
        Image userImage = userProfile.getImage();

        String oldPublicId = userImage != null
                ? userImage.getPublicId()
                : null;

        ImageUploadResponseDto upload = imageService.upload(file, ImageFolder.USER);
        try {
            if (userImage == null) {
                userImage = new Image();
            }

            userImage.setPublicId(upload.publicId());
            userImage.setUrl(upload.secureUrl());
            userImage.setContentType(file.getContentType());
            userImage.setOriginalFilename(file.getOriginalFilename());
            userImage.setSize(file.getSize());
            userImage.setUploadedAt(Instant.now());

            userProfile.setImage(userImage);
        } catch (Exception e) {
            imageService.delete(upload.publicId());
            throw new UserImageUploadException("Failed to save image");
        }

        if (oldPublicId != null) {
            imageService.delete(oldPublicId);
        }
    }

}
