import { type Role, type User } from "@/shared/types/types.ts";

/**
 *  Has permission
 * @param user
 * @param currentRole
 */
export function hasRole(user: User, currentRole: Role) {
  return user.roles.includes(currentRole);
}

/**
 *  Has any permission
 * @param user
 * @param currentRole
 */
export function hasAnyRole(user: User, currentRole: Role) {
  return user.roles.some((role) => role === currentRole);
}
