import {editProfile} from "@/features/users/userApi.ts";
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