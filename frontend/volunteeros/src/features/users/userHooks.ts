import {editProfile, uploadAvatar} from "@/features/users/userApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";


export  function useEditProfile() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProfile,
        onSuccess: async ()=> {
            await queryClient.invalidateQueries({
                queryKey: ["profile"],
            })
        }
    })

}


export function useUploadAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadAvatar,
        onSuccess: async ()=> {
            await queryClient.invalidateQueries({
                queryKey: ["profile"],
            })
        }
    })
}