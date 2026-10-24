import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";

import {createSkill, fetchAllSkills, updateSkill, deleteSkill} from "@/features/skills/skillsApi.ts";
import type {SkillResponse} from "@/features/skills/skillsApi.ts";

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

export function useSkills() {

    return useQuery({
        queryKey: ["skills"],
        queryFn: fetchAllSkills,
        staleTime: DEFAULT_STALE_TIME,
    })
}

export function useCreateSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSkill,

        onSuccess: (newSkill) => {
            queryClient.setQueryData<SkillResponse[]>(
                ["skills"],
                (oldSkills) => {
                    if (!oldSkills) {
                        return [newSkill];
                    }
                    return [...oldSkills, newSkill];
                }
            )
        }
    })
}

export function useUpdateSkills() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSkill,

        onSuccess: (updatedSkill) => queryClient.setQueryData<SkillResponse[]>(["skills"], (oldSkills) => {
            if (!oldSkills) {
                return oldSkills;
            }

            return oldSkills.map((oldSkill) => oldSkill.id === updatedSkill.id ? updatedSkill : oldSkill);
        }),
    })
}

export function useDeleteSkills() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSkill,

        onSuccess: (removedSkill) => queryClient.setQueryData<SkillResponse[]>(["skills"], (oldSkills) =>
            oldSkills?.filter((oldSkill) => oldSkill.id !== removedSkill.id) ?? []),
    })
}