package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.domain.enums.CursorDirection;
import de.upteams.volunteeros.domain.enums.PageDirection;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    ProjectResponseDto createProject( String email, ProjectCreateRequestDto requestDto);

    ProjectResponseDto editProject(Long projectId, ProjectEditRequestDto requestDto, String email);

    ProjectParticipationResponseDto apply(Long projectId, String email);

    ProjectParticipationStatusUpdateResponseDto withdraw(Long projectId);

    ProjectResponseDto  activateProject(Long projectId);

    ProjectResponseDto cancelProject(Long projectId, String email);

    ProjectResponseDto completeProject(Long projectId, String email);

    void removeProject(Long projectId, String email); // ???

    String updateParticipantStatus(
            Long participationId,
            ParticipantStatusRequestDto requestDto);

    List<ProjectResponseDto> allProjects();

    ProjectResponseDto getProjectById(Long projectId);

    List<ProjectResponseDto> allPendingModerationProjects();

    List<ProjectResponseDto> allActiveProjects();

    List<ProjectResponseDto> myProjects(String email);

    List<ProjectParticipationResponseDto> myProjectParticipationApplications(String email);

    List<ParticipantsResponseDto> myParticipants(String email);

    void uploadProjectImage(Long projectId, String email, MultipartFile file);


    CursorPage<ProjectResponseDto> searchActiveProjectsByTitle(String title, String cursor, int limit, CursorDirection direction);

    List<ParticipantsResponseDto> getApprovedProjectParticipants(Long projectId);

    CursorPage<ProjectResponseDto>  activeProjectsPage(String cursor, int limit, PageDirection direction);

    CursorPage<ProjectResponseDto> previousPage(String cursor, int limit);

}
