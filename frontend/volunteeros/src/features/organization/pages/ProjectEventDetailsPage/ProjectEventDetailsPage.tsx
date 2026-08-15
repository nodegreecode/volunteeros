import {Outlet, useParams} from "react-router-dom";
import {Box, Chip, Paper, Typography} from "@mui/material";
import ProjectEventTabs from "@/features/organization/components/ProjectEventTabs/ProjectEventTabs.tsx";
import {useSingleProjectEvent} from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading.tsx";

const getEventStatusColor = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "info";
        case "CHECK_IN":
            return "warning";
        case "IN_PROGRESS":
            return "primary";
        case "COMPLETED":
            return "success";
        case "CANCELLED":
            return "error";
        default:
            return "default";
    }
}

const eventStatusLabels = {
    PUBLISHED: "Published",
    CHECK_IN: "Check-In",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export default function ProjectEventDetailsPage() {

    const {id} = useParams();

    const {data: event, isLoading} = useSingleProjectEvent(Number(id));


    if (isLoading) {
        return <Loading/>;
    }

    return (<>
        <Box>

            <Box sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                mb: 2
            }}>
                <Typography variant="h5" component="h2">{event.title}</Typography>
                <Chip color={getEventStatusColor(event.status)}
                      label={eventStatusLabels[event.status]}
                      size="small"/>
            </Box>


            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Paper sx={{width: "100%", maxWidth: 900, mb: 3}}>
                    <ProjectEventTabs/>
                    <Box>
                        <Outlet context={event}/>
                    </Box>
                </Paper>

            </Box>
        </Box>
    </>)
}