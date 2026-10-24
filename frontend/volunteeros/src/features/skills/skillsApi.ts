import {VolunteerSkillsUrls} from "@/api/volunteeros-be-api.ts";

type SkillProficiency = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

interface SkillCreateRequest {
    name: string;
    proficiency: SkillProficiency;
}

interface SkillEditRequest {
    skillId: number;
    name: string;
    proficiency: SkillProficiency;
}

export interface SkillResponse {
    id: number;
    name: string;
    proficiency: SkillProficiency;
}

export async function createSkill(data: SkillCreateRequest): Promise<SkillResponse> {

    const response = await fetch(VolunteerSkillsUrls.createSkill, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json() as SkillResponse;
}

export async function fetchAllSkills(): Promise<SkillResponse[]> {
    const response = await fetch(VolunteerSkillsUrls.getSkills, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json() as SkillResponse[];
}

export async function updateSkill(values: SkillEditRequest) {
    const response = await fetch(VolunteerSkillsUrls.updateSkill(values.skillId), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({name: values.name, proficiency: values.proficiency}),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json() as SkillResponse;
}

export async function deleteSkill( skillId: number ) {
    const response = await fetch(VolunteerSkillsUrls.deleteSkill(skillId), {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json() as SkillResponse;
}