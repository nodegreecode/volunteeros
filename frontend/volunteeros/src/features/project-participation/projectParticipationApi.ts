import {ProjectParticipationUrls} from "@/api/volunteeros-be-api.ts";


type WithdrawParticipationParams = {
    participationId: number;
};

export async function withdrawParticipation({
                                                participationId,
                                            }: WithdrawParticipationParams) {
    const withdrawResponse = await fetch(
        ProjectParticipationUrls.withdrawProjectParticipation(participationId),
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    if (!withdrawResponse.ok) {
        throw new Error("Failed to withdraw participation");
    }
    return withdrawResponse.json();
}

export async function myParticipations() {
    const participationsResponse = await fetch(
         ProjectParticipationUrls.getProjectParticipationApplications,
        {
            method: "GET",
            credentials: "include",
        },
    );

    if (!participationsResponse.ok) {
        throw new Error("Failed to find participations");
    }

    return participationsResponse.json();
}

export async function myParticipants() {
    const participantsResponse = await fetch(ProjectParticipationUrls.getProjectParticipantsApplications, {
        method: "GET",
        credentials: "include",
    });

    if (!participantsResponse.ok) {
        throw new Error("Failed to find participants");
    }

    return participantsResponse.json();
}

/**
 * Update participation status
 */
export async function updateParticipationStatus({participationId, status}) {
    const participationStatusResponse = await fetch(
        ProjectParticipationUrls.updateProjectParticipationStatus(participationId),
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({status}),
        },
    );

    if (!participationStatusResponse.ok) {
        throw new Error("Participation status update failed");
    }

    return participationStatusResponse.text();
}