package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.Image;
import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.domain.model.ProjectDocument;
import de.upteams.volunteeros.dto.image.ImageUploadResponseDto;
import de.upteams.volunteeros.dto.project.ProjectResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectSearchMapper {

    ProjectDocument mapEntityToProjectDocument(Project entity);

    @Mapping(source = "url", target = "secureUrl")
    ProjectDocument.ImageDocument mapImageToImageDocument(Image image);

    ImageUploadResponseDto mapImageDocumentToImageUploadResponseDto(ProjectDocument.ImageDocument imageDocument);

    ProjectResponseDto mapProjectDocumentToProjectResponseDto(ProjectDocument document);
}
