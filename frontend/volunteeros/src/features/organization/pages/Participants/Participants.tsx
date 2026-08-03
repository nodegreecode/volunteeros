import {useMyParticipants} from "@/features/volunteer/volHooks.ts";
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
                <Typography variant="h4" sx={{mb: 3}}>
                    Project Applications
                </Typography>

                <Typography color="text.secondary">
                    You don't have an organization yet. Create an organization to start
                    receiving project applications.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{mb: 3}}>
                Project Applications
            </Typography>

            <Stack spacing={3}>
                <ParticipationStats participations={myParticipants}/>
                <ParticipationFilters/>
                <ParticipationTable participants={myParticipants}/>
            </Stack>
        </Box>
    );
}