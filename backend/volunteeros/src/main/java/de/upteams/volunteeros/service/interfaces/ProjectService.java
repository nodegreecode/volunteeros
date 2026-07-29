package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ProjectService {

    ProjectEditResponseDto editProject(Long projectId, ProjectEditRequestDto requestDto, Authentication authentication);

    String changeParticipantStatus(
            Long participationId,
            ParticipantStatusRequestDto requestDto);

    ProjectParticipationResponseDto apply(Long projectId, Authentication authentication);

    List<ProjectResponseDto> allProjects();

    List<ProjectResponseDto> allPendingModerationProjects();

    ProjectParticipationStatusUpdateResponseDto withdraw(Long projectId);

    List<ProjectResponseDto> allActiveProjects();

    ProjectEditResponseDto completeProject(Long projectId);

    void removeProject(Long projectId);

    ProjectEditResponseDto activateProject(Long projectId);

    ProjectEditResponseDto cancelProject(Long projectId);

}
