import {Outlet} from "react-router-dom";
import {Box, Paper} from "@mui/material";
import OrganizationTabs from "@/features/organization/components/OrganizationTabs/OrganizationTabs.tsx";


export default function OrganizationDashboardLayout() {
    return <>
        <Box>
            <Paper sx={{mb: 3}}>
                <OrganizationTabs/>
            </Paper>
            <Outlet/>
        </Box>
    </>
}