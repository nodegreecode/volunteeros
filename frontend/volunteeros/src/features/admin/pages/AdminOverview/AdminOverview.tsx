import {useDataBaseStatus} from "@/features/admin/adminHooks.ts";
import {Box, Stack, Typography} from "@mui/material";

export default function AdminOverview() {


    const metrics = useDataBaseStatus();

    return <>
        <Box>
            <Stack spacing={2}>
                <Typography variant="body1" color="textSecondary">Admin Overview</Typography>
                <Typography variant="caption" color="textSecondary">Active Connections: {metrics?.activeConnections}</Typography>
                <Typography variant="body2" color="textSecondary">Idle Connections: {metrics?.idleConnections}</Typography>
                <Typography variant="body2" color="textSecondary">Max Connections: {metrics?.maxConnections}</Typography>
                <Typography variant="body2" color="textSecondary">Pool Utilization: {metrics?.poolUtilization}</Typography>
                <Typography variant="body2" color="textSecondary">Severity: {metrics?.severity}</Typography>
                <Typography variant="body2" color="textSecondary">Waiting Threads: : {metrics?.waitingThreads}</Typography>
            </Stack>
        </Box>

    </>
}