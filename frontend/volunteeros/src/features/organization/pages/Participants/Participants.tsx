import {useMyParticipants} from "@/features/project-participation/projectParticipationHook.ts";
import Loading from "@/components/common/Loading.tsx";
import {Box, Stack, Typography} from "@mui/material";
import ParticipationStats from "@/features/organization/components/Participants/ParticipationStats.tsx";
import ParticipationFilters from "@/features/organization/components/Participants/ParticipationFilters.tsx";
import ParticipationTable from "@/features/organization/components/Participants/ParticipationTable.tsx";

export default function Participants() {
    const {data: myParticipants, isLoading} = useMyParticipants();

    if (isLoading) {
        return <Loading/>;
    }

    if (!myParticipants || myParticipants.length === 0) {
        return (
            <Box>
                <Typography color="text.secondary">
                    You don't have participants yet.
                </Typography>
            </Box>
        );
    }

    return (

        <Stack spacing={3}>
            <ParticipationStats participations={myParticipants}/>
            <ParticipationFilters/>
            <ParticipationTable participants={myParticipants}/>
        </Stack>

    );
}