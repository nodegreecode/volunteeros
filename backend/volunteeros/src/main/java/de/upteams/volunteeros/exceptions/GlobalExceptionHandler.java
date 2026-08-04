package de.upteams.volunteeros.exceptions;

import de.upteams.volunteeros.dto.errors.ApiError;
import de.upteams.volunteeros.exceptions.types.*;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(RegistrationException.class)
    public ResponseEntity<ApiError> handleException(RegistrationException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiError(message));
    }

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ApiError> handleException(AuthorizationException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiError(message));
    }

    @ExceptionHandler(InvalidProjectStatusException.class)
    public ResponseEntity<String> handleException(InvalidProjectStatusException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<String>> handleException(ConstraintViolationException e) {
        List<String> messages = e.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .peek(logger::warn)
                .toList();
        return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleException(MethodArgumentNotValidException e) {
        List<String> messages = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .peek(logger::warn)
                .toList();
        return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApplicationAlreadyExistException.class)
    public ResponseEntity<String> handleException(ApplicationAlreadyExistException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(PhoneAlreadyExistsException.class)
    public ResponseEntity<String> handleException(PhoneAlreadyExistsException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(OrganizationNotFounException.class)
    public ResponseEntity<String> handleException(OrganizationNotFounException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleException(AccessDeniedException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProjectStatusUpdateException.class)
    public ResponseEntity<String> handleException(ProjectStatusUpdateException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ProjectEditDeniedException.class)
    public ResponseEntity<String> handleException(ProjectEditDeniedException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ParticipationAlreadyExistException.class)
    public ResponseEntity<String> handleException(ParticipationAlreadyExistException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(OrganizationApplicationStatusException.class)
    public ResponseEntity<ApiError> handleException(OrganizationApplicationStatusException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiError(message));
    }

    @ExceptionHandler(OrganizationAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleException(OrganizationAlreadyExistsException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiError(message));
    }

    @ExceptionHandler(DuplicateOrganizationException.class)
    public ResponseEntity<ApiError> handleException(DuplicateOrganizationException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiError(message));
    }

    @ExceptionHandler(ImageUploadException.class)
    public ResponseEntity<ApiError> handleException(ImageUploadException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiError(message));
    }

    @ExceptionHandler(ProjectNotActiveException.class)
    public ResponseEntity<ApiError> handleException(ProjectNotActiveException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiError(message));
    }

    @ExceptionHandler(ProjectEventStatusException.class)
    public ResponseEntity<ApiError> handleException(ProjectEventStatusException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiError(message));
    }

    @ExceptionHandler(QrCodeServiceException.class)
    public ResponseEntity<ApiError> handleException(QrCodeServiceException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiError(message));
    }

    @ExceptionHandler(VolunteerEventRegistrationException.class)
    public ResponseEntity<ApiError> handleException(VolunteerEventRegistrationException e) {
        String message = e.getMessage();
        logger.warn(message, e);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiError(message));
    }

}
