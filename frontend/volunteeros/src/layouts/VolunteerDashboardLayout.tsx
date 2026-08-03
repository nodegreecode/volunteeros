import {Box, Paper} from "@mui/material";
import VolunteerTabs from "@/features/volunteer/components/VolunteerTabs/VolunteerTabs.tsx";
import {Outlet} from "react-router-dom";

export default function VolunteerDashboardLayout() {
    return <>
        <Box>
            <Paper sx={{mb: 3}}>
                <VolunteerTabs/>
            </Paper>
            <Outlet/>
        </Box>
    </>
}