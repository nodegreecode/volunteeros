import {AuthUrls} from "@/api/volunteeros-be-api.ts";
import {
    type RegisterRequestPayload,
    type LoginRequestPayload,
} from "./types.ts";
import type {Role} from "@/shared/types/types.ts";

interface ApiError {
    message: string;
}

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
 *  Register new user
 * @param values
 */
export async function registerUser(values: RegisterRequestPayload): Promise<void> {
    const registerResponse = await fetch(AuthUrls.signup, {
        method: "POST",
        headers: {"content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(values),
    });

    if (!registerResponse.ok) {
        const error = await registerResponse.json() as ApiError;
        throw new Error(error.message);
    }
}

/**
 *  Login
 * @param values
 */
export async function loginUser(values: LoginRequestPayload) {
    const payload = {email: values.email, password: values.password};

    const loginResponse = await fetch(AuthUrls.login, {
        method: "POST",
        headers: {"content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!loginResponse.ok) {
        const error = await loginResponse.json() as ApiError;
        throw new Error(error.message);
    }
}

/**
 *  Fetch user profile
 */
export async function fetchProfile() {

    const profileResponse = await apiFetch(AuthUrls.profile);

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

    await fetch(AuthUrls.logout, {
        method: "POST",
        credentials: "include",
    });
}

/**
 *  Create AccessToken refresh function
 */
function createTokenRefresher() {
    let refreshPromise: Promise<boolean> | null = null;

    return async function refreshAccessToken() {

        if (refreshPromise) {
            return refreshPromise;
        }

        refreshPromise = (async () => {
            try {
                const response = await fetch(AuthUrls.refresh, {
                    method: "POST",
                    credentials: "include",
                });
                return response.ok;
            } catch {
                return false;
            } finally {
                refreshPromise = null;
            }
        })();

        return refreshPromise;
    }
}

const refreshAccessToken = createTokenRefresher();

/**
 *  Wrapper function to prevent unauthorized failure in case AccessToken expiration
 * @param url
 * @param options
 * @param retry
 */
async function apiFetch(url: string, options: RequestInit = {}, retry = true) {
    const response = await fetch(url, {...options, credentials: 'include'});

    if (response.status !== 401) {
        return response;
    }

    if (!retry) {
        return response;
    }

    const refreshed = await refreshAccessToken();

    if (!refreshed) {
        return response;
    }

    return apiFetch(url,
        options,
        false);

}

