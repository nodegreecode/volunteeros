import {type Role, type User} from "@/shared/types/types.ts";

/**
 *  Has permission
 * @param user
 * @param currentRole
 */
export function hasRole(user: User, currentRole: Role) {
    return user.roles.includes(currentRole);
}

export function hasRoles(user: User, allowedRoles: Role[]) {
    return allowedRoles.some(role => user.roles.includes(role));
}

/**
 *  Has any permission
 * @param user
 * @param currentRole
 */
export function hasAnyRole(user: User, currentRole: Role) {
    return user.roles.some((role) => role === currentRole);
}
