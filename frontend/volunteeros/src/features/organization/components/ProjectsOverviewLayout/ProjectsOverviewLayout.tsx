import {Link, Outlet, useOutletContext} from "react-router-dom";
import ProjectsTabs from "@/features/organization/components/ProjectsTabs/ProjectsTabs.tsx";
import {
    Typography,
    Stack,
    Button,
    Grid,
    Card,
    CardContent
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function ProjectsOverviewLayout() {
    const projects = useOutletContext();
    return <>
        {/* Header */}
        <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center", mb: 4}}>
            <Typography>Quick Stats</Typography>
            <Button variant="contained" component={Link} to="create" startIcon={<AddIcon/>}>New Project</Button>
        </Stack>
        {/* Quick Stats */}
        <Grid container spacing={2} sx={{mb: 5}}>
            <Grid size={{xs: 12, sm: 6, md: 3}}>
                <Card sx={{backgroundColor: "#F1F2F7"}}>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            Total Projects
                        </Typography>
                        <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                            {projects?.length}
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
        <ProjectsTabs/>
        <Outlet context={projects}/>
    </>
}