import {ProjectEventRegistrationUrls} from "@/api/volunteeros-be-api.ts";


export async function fetchRegistrationQrCode(registrationId: number) {
    const response = await fetch(ProjectEventRegistrationUrls.getProjectEventRegistrationQrCodeByRegistrationId(registrationId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load qr code fro registration: " + registrationId);
    }

    return response.json();
}

export async function withdrawEventParticipation(registrationId: number) {
    const withdrawResponse = await fetch(
        ProjectEventRegistrationUrls.cancelProjectEventRegistration(registrationId),
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    if (!withdrawResponse.ok) {
        throw new Error("Failed to withdraw event participation");
    }
    return withdrawResponse.json();
}

export async function checkInVolunteer(values) {
    const response = await fetch(
        ProjectEventRegistrationUrls.markProjectEventRegistrationAsCheckIn,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to check in volunteer");
    }

    return await response.json();
}