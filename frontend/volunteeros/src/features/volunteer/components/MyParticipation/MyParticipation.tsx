import {useMyParticipations} from "@/features/volunteer/volHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import {Stack} from "@mui/material";
import ApplicationCard from "@/features/volunteer/components/ApplicationCard.tsx";

export default function MyParticipation(){
    const { data: myParticipations, isLoading  } = useMyParticipations();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Stack spacing={2}>
            {myParticipations?.map((application) => (
                <ApplicationCard key={application.id} application={application} />
            ))}
        </Stack>
    );
}