package de.upteams.volunteeros.security.service;

import de.upteams.volunteeros.domain.model.User;

import de.upteams.volunteeros.domain.model.UserProfile;
import de.upteams.volunteeros.domain.model.UserRole;
import de.upteams.volunteeros.domain.enums.UserStatus;
import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.exceptions.types.RegistrationException;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.security.config.JwtProperties;
import de.upteams.volunteeros.security.dto.LoginRequestDto;
import de.upteams.volunteeros.security.dto.TokenResponseDto;
import de.upteams.volunteeros.security.dto.enums.TokenType;
import de.upteams.volunteeros.security.service.interfaces.AuthService;
import de.upteams.volunteeros.service.RedisService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
public class AuthServiceImpl implements AuthService {

    private final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final JwtProperties jwtProperties;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final RedisService redisService;
    private final UserRepository userRepository;


    public AuthServiceImpl(BCryptPasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                           TokenService tokenService,
                           JwtProperties jwtProperties,
                           UserRepository userRepository,
                           RedisService redisService
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtProperties = jwtProperties;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.redisService = redisService;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void register(UserRegistrationDto registrationDto) {

        if (userRepository.existsByEmail(registrationDto.email())) {
            throw new RegistrationException(String.format("Email %s already in use", registrationDto.email()));
        }

        User user = createUser(registrationDto);

        userRepository.save(user);
        logger.info("User registered successfully with email '{}",
                registrationDto.email());
    }

    @Override
    public TokenResponseDto login(LoginRequestDto requestDto) {

        String email = requestDto.email();
        String password = requestDto.password();

        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(email, password));

            /*UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();*/

            String accessToken = tokenService.generateAccessToken(email);
            String refreshToken = tokenService.generateRefreshToken(email);

            redisService.save(email,
                    refreshToken,
                    Duration.ofMillis(jwtProperties.getRefreshExpiration()));

            logger.info("User '{}' logged in successfully", email);

            return new TokenResponseDto(accessToken, refreshToken);

        } catch (AuthenticationException e) {
            throw new AuthorizationException("Invalid credentials");
        }
    }

    @Override
    public void logout(String refreshToken) {

        if (refreshToken != null && tokenService.validateRefreshToken(refreshToken)) {
            Claims refreshClaims = tokenService.getRefreshClaims(refreshToken);
            String email = refreshClaims.getSubject();

            String storedRefreshToken = redisService.find(email);

            if (refreshToken.equals(storedRefreshToken)) {
                redisService.delete(email);
                logger.debug("RefreshToken successfully removed");
            }
        }
    }

    @Override
    public TokenResponseDto getAccessToken(String refreshToken) {

        if (refreshToken != null && tokenService.validateRefreshToken(refreshToken)) {
            Claims refreshClaims = tokenService.getRefreshClaims(refreshToken);
            String email = refreshClaims.getSubject();

            String savedRefreshToken = redisService.find(email);

            if (savedRefreshToken != null && savedRefreshToken.equals(refreshToken)) {
                String accessToken = tokenService.generateAccessToken(email);
                return new TokenResponseDto(accessToken);
            }
        }
        throw new AuthorizationException("Refresh token is invalid");
    }

    @Override
    public void removeRefreshToken(HttpServletRequest request) {

        String refreshToken = tokenService.getTokenFromRequest(
                request,
                TokenType.REFRESH_TOKEN.getValue());

        if (refreshToken != null && tokenService.validateRefreshToken(refreshToken)) {
            Claims refreshClaims = tokenService.getRefreshClaims(refreshToken);
            String email = refreshClaims.getSubject();

            redisService.delete(email);
        }
    }

    private User createUser(UserRegistrationDto registrationDto) {

        Instant now = Instant.now();

        User user = new User();

        user.setEmail(registrationDto.email());
        user.setPassword(passwordEncoder.encode(registrationDto.password()));
        user.setStatus(UserStatus.ACTIVE);
        user.setEnabled(true);
        user.setCreatedAt(now);

        UserProfile userProfile = new UserProfile();
        userProfile.setCreatedAt(now);
        userProfile.setFirstName(registrationDto.firstName());
        userProfile.setLastName(registrationDto.lastName());
        userProfile.setCreatedAt(now);
        userProfile.setUser(user);
        user.setUserProfile(userProfile);

        UserRole role = new UserRole();
        role.setRole(registrationDto.role());
        role.setAssignedAt(now);
        role.setUser(user);
        user.getRoles().add(role);

        return user;
    }

}
