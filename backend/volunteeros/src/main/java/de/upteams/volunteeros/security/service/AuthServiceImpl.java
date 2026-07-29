package de.upteams.volunteeros.security.service;

import de.upteams.volunteeros.domain.User;

import de.upteams.volunteeros.domain.UserProfile;
import de.upteams.volunteeros.domain.UserRole;
import de.upteams.volunteeros.domain.enums.UserStatus;
import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.exceptions.types.RegistrationException;
import de.upteams.volunteeros.repository.OrganizationRepository;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.security.AuthUserDetails;
import de.upteams.volunteeros.security.config.JwtProperties;
import de.upteams.volunteeros.security.dto.LoginRequestDto;
import de.upteams.volunteeros.security.dto.TokenResponseDto;
import de.upteams.volunteeros.security.dto.enums.TokenType;
import de.upteams.volunteeros.security.service.interfaces.AuthService;
import de.upteams.volunteeros.service.RedisService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
public class AuthServiceImpl implements AuthService {

    private final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final JwtProperties jwtProperties;
    private final BCryptPasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final RedisService redisService;
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;


    public AuthServiceImpl(BCryptPasswordEncoder passwordEncoder,
                           TokenService tokenService,
                           JwtProperties jwtProperties,
                           UserRepository userRepository,
                           RedisService redisService,
                           OrganizationRepository organizationRepository) {
        this.jwtProperties = jwtProperties;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.redisService = redisService;
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> {
                    logger.warn("Authentication failed: user with email '{}' not found", email);
                    return new UsernameNotFoundException(String.format("User with email %s not found", email));
                }
        );
        return new AuthUserDetails(user);
    }

    @Override
    public void register(UserRegistrationDto registrationDto) {
        String encodedPassword = passwordEncoder.encode(registrationDto.password());
        User user = userRepository.findByEmail(registrationDto.email()).orElse(null);

        if (user == null) {

            user = new User();
            user.setEmail(registrationDto.email());
            user.setPassword(encodedPassword);
            user.setStatus(UserStatus.ACTIVE);
            user.setEnabled(true);
            user.setCreatedAt(Instant.now());

            UserRole role = new UserRole();
            role.setRole(registrationDto.role());
            role.setAssignedAt(Instant.now());

            UserProfile userProfile = new UserProfile();
            user.setUserProfile(userProfile);
            userProfile.setCreatedAt(Instant.now());
            userProfile.setFirstName(registrationDto.firstName());
            userProfile.setLastName(registrationDto.lastName());

            role.setUser(user);
            user.getRoles().add(role);
            userProfile.setUser(user);
            userProfile.setCreatedAt(Instant.now());

        } else {
            throw new RegistrationException(String.format("Email %s already in use", registrationDto.email()));
        }

        userRepository.save(user);
        logger.info("User registered successfully with email '{}",
                registrationDto.email());
    }

    @Override
    public TokenResponseDto login(LoginRequestDto requestDto) {
        String email = requestDto.email();
        UserDetails user = loadUserByUsername(email);

        if (passwordEncoder.matches(requestDto.password(), user.getPassword())) {
            String accessToken = tokenService.generateAccessToken(email);
            String refreshToken = tokenService.generateRefreshToken(email);
            redisService.save(email, refreshToken, Duration.ofMillis(jwtProperties.getRefreshExpiration()));
            logger.info("User '{}' logged in successfully", email);
            return new TokenResponseDto(accessToken, refreshToken);
        } else {
            logger.warn("Failed login attempt for user '{}': invalid password", email);
            throw new AuthorizationException("Password is incorrect");
        }

    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = tokenService.getTokenFromRequest(request, TokenType.REFRESH_TOKEN.getValue());

        if (refreshToken != null && tokenService.validateRefreshToken(refreshToken)) {
            Claims refreshClaims = tokenService.getRefreshClaims(refreshToken);
            String email = refreshClaims.getSubject();

            String storedRefreshToken = redisService.find(email);
            if (refreshToken.equals(storedRefreshToken)) {
                redisService.delete(email);
                logger.debug("RefreshToken successfully removed");
            }
        }

        Cookie accessCookie = new Cookie(TokenType.ACCESS_TOKEN.getValue(), null);
        accessCookie.setPath("/");
        accessCookie.setHttpOnly(true);
        accessCookie.setMaxAge(0);
        //NEW
        accessCookie.setSecure(true);
        accessCookie.setAttribute("SameSite", "None");

        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie(TokenType.REFRESH_TOKEN.getValue(), null);
        refreshCookie.setPath("/");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setMaxAge(0);
        //NEW
        refreshCookie.setSecure(true);
        refreshCookie.setAttribute("SameSite", "None");

        response.addCookie(refreshCookie);

        logger.info("User '{}' logged out successfully", request.getUserPrincipal().getName());
    }

    @Override
    public TokenResponseDto getAccessToken(HttpServletRequest request) {
        String refreshToken = tokenService.getTokenFromRequest(request, TokenType.REFRESH_TOKEN.getValue());

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
        String refreshToken = tokenService.getTokenFromRequest(request, TokenType.REFRESH_TOKEN.getValue());

        if (refreshToken != null && tokenService.validateRefreshToken(refreshToken)) {
            Claims refreshClaims = tokenService.getRefreshClaims(refreshToken);
            String email = refreshClaims.getSubject();

            redisService.delete(email);
        }
    }

}
