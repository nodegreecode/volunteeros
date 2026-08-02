package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.model.ModerationCase;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;
import de.upteams.volunteeros.dto.mapping.ModerationCasesMapper;
import de.upteams.volunteeros.dto.moderation.ModerationCaseResponseDto;
import de.upteams.volunteeros.dto.moderation.ModerationCaseStatusUpdateDto;
import de.upteams.volunteeros.repository.ModerationCaseRepository;
import de.upteams.volunteeros.service.interfaces.ModerationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ModerationServiceImpl implements ModerationService {

    private final Logger logger = LoggerFactory.getLogger(ModerationServiceImpl.class);

    private final ModerationCaseRepository moderationCaseRepository;
    private final ModerationCasesMapper moderationCasesMapper;

    public ModerationServiceImpl(ModerationCaseRepository moderationCaseRepository, ModerationCasesMapper moderationCasesMapper) {
        this.moderationCaseRepository = moderationCaseRepository;
        this.moderationCasesMapper = moderationCasesMapper;
    }

    @Override
    public List<ModerationCaseResponseDto> moderationCases() {

        List<ModerationCase> moderationCases = moderationCaseRepository.findAll();
        return moderationCasesMapper.mapEntityToModerationCaseResponseDtoList(moderationCases);
    }

    @Override
    @Transactional
    public ModerationCaseResponseDto updateCaseStatus(Long caseId, ModerationCaseStatusUpdateDto requestDto) {

        Objects.requireNonNull(caseId, "caseId cannot be null");
        Objects.requireNonNull(requestDto, "ModerationCaseStatusUpdateDto cannot be null");

        ModerationCase moderationCase = moderationCaseRepository.findById(caseId).orElseThrow(() -> {
            logger.warn("Moderation case not found {}", caseId);
            return new EntityNotFoundException("Moderation case  not found");
        });
        moderationCase.setModerationCaseStatus(ModerationCaseStatus.valueOf(requestDto.caseStatus()));

        return moderationCasesMapper.mapEntityToModerationCaseResponseDto(moderationCase);
    }
}
