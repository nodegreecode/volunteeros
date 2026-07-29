import { AuthUrls } from "@/api/volunteeros-be-api.ts";
import {
  type RegisterRequestPayload,
  type LoginRequestPayload,
} from "./types.ts";
import type { Role } from "@/shared/types/types.ts";

interface User {
  id: number;
  roles: Role[];
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  avatar: string;
  bio: string;
  createdA: string;
  updatedAt: string;
}

/**
 *  Login
 * @param values
 */
export async function loginUser(values: LoginRequestPayload) {
  const payload = { email: values.email, password: values.password };

  const loginResponse = await fetch(AuthUrls.login, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!loginResponse.ok) {
    throw new Error("Login failed");
  }
}

/**
 *  Fetch user profile
 */
export async function fetchProfile() {
  const profileResponse = await fetch(AuthUrls.profile, {
    credentials: "include",
  });

  if (profileResponse.status == 401 || profileResponse.status == 403) {
    return null;
  }

  if (!profileResponse.ok) {
    throw new Error("Failed to load user data");
  }

  return await profileResponse.json();
}

/**
 *  Logout
 */
export async function logoutUser() {
  const logoutResponse = await fetch(AuthUrls.logout, {
    method: "POST",
    credentials: "include",
  });
  if (!logoutResponse.ok) {
    throw new Error("Logout failed");
  }
}

/**
 *  Register new user
 * @param values
 */
export async function registerUser(values: RegisterRequestPayload) {
  const registerResponse = await fetch(AuthUrls.signup, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(values),
  });

  if (!registerResponse.ok) {
    throw new Error("Register failed. Email already exists");
  }

  return registerResponse.text();
}
