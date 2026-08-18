package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.enums.UserRoleType;
import de.upteams.volunteeros.domain.model.UserProfile;
import de.upteams.volunteeros.domain.model.UserRole;
import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", uses = ImageMapper.class)
public interface ProfileMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ProfileEditRequestDto dto, @MappingTarget UserProfile entity);

    default List<UserRoleType> mapRoles(Set<UserRole> roles) {
        return roles.stream()
                .map(UserRole::getRole)
                .toList();
    }

    @Mapping(source = "user.id", target = "id")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.roles", target = "roles")
    @Mapping(source = "image", target = "avatar")
    MeResponseDto mapEntityToMeResponseDto(UserProfile entity);
}
