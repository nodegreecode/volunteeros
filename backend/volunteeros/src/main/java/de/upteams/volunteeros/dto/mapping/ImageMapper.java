package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.Image;
import de.upteams.volunteeros.dto.image.ImageResponseDto;
import de.upteams.volunteeros.dto.image.ImageUploadResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel= "spring")
public interface ImageMapper {

    @Mapping(source = "url", target = "secureUrl")
    ImageUploadResponseDto mapEntityToImageUploadResponseDto(Image image);

    ImageResponseDto mapEntityToImageResponseDto(Image image);
}
