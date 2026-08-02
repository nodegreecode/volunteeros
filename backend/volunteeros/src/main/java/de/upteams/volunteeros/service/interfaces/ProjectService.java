package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    ProjectCreateResponseDto createProject(Long organizationId, ProjectCreateRequestDto requestDto);

    ProjectEditResponseDto editProject(Long projectId, ProjectEditRequestDto requestDto, String email);

    ProjectParticipationResponseDto apply(Long projectId, String email);

    ProjectParticipationStatusUpdateResponseDto withdraw(Long projectId);

    ProjectEditResponseDto activateProject(Long projectId);

    ProjectEditResponseDto cancelProject(Long projectId);

    ProjectEditResponseDto completeProject(Long projectId);

    void removeProject(Long projectId); // ???

    String updateParticipantStatus(
            Long participationId,
            ParticipantStatusRequestDto requestDto);

    List<ProjectResponseDto> allProjects();

    List<ProjectResponseDto> allPendingModerationProjects();

    List<ProjectResponseDto> allActiveProjects();

    List<ProjectCreateResponseDto> allMyProjects(String email);

    List<ProjectParticipationResponseDto> myProjectParticipationApplications(String email);

    List<ParticipantsResponseDto> myParticipants(String email);

    void uploadProjectImage(Long projectId, MultipartFile file);

    void replaceProjectImage(Long projectId, MultipartFile file);

}
