import {Outlet} from "react-router-dom";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import MyProjectsTabs from "@/features/volunteer/components/MyProjectsTabs/MyProjectsTabs.tsx";
import {
    ProjectDetailsDrawer
} from "@/features/volunteer/components/ProjectDetailsDrawer/ProjectDetailsDrawer.tsx";
import {useSearchParams} from "react-router-dom";
import {useSingleProject} from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import {useProjectEvents} from "@/features/volunteer/volHooks.ts";
import ProjectEventsDrawer from "@/features/volunteer/components/ProjectEventsDrawer/ProjectEventsDrawer.tsx";

export default function MyProjectsLayout() {

    const [searchParams, setSearchParams] = useSearchParams();
    const projectId = searchParams.get("projectId");
    const eventsProjectId = searchParams.get("eventsProjectId");

    const {data: project, isLoading: isLoadingProject} = useSingleProject(Number(projectId));

    const {data: projectEvents, isLoading: isLoadingProjectEvents} = useProjectEvents(Number(eventsProjectId));

    if (isLoadingProject || isLoadingProjectEvents) {
        return <Loading/>
    }

    const handleClose = () => {
        setSearchParams({});
    };
    return <>
        <Grid container spacing={2} sx={{mb: 5}}>
            <Grid size={{xs: 12, sm: 6, md: 3}}>
                <Card sx={{backgroundColor: "#F1F2F7"}}>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            Total Projects
                        </Typography>
                        <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                            23
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{xs: 12, sm: 6, md: 3}}>
                <Card sx={{backgroundColor: "#F1F2F7"}}>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            Total Events
                        </Typography>
                        <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                            86
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{xs: 12, sm: 6, md: 3}}>
                <Card sx={{backgroundColor: "#F1F2F7"}}>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            Total Participants
                        </Typography>
                        <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                            223
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{xs: 12, sm: 6, md: 3}}>
                <Card sx={{backgroundColor: "#F1F2F7"}}>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            New Participants
                        </Typography>
                        <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                            11
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <MyProjectsTabs/>
        <Outlet/>
        <ProjectDetailsDrawer
            open={Boolean(projectId)}
            project={project}
            onClose={handleClose}/>

        <ProjectEventsDrawer
            open={Boolean(eventsProjectId)}
            events={projectEvents}
            onClose={handleClose}
        />

    </>
}