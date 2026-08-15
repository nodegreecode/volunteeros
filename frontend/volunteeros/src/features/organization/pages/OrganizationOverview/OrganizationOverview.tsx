import {Box, Stack, Typography} from "@mui/material";

export default function OrganizationOverview() {
    return <>
        <Box>
            <Typography>Welcome</Typography>
            <Box sx={{border: 1, borderColor: 'gray', p: 4, backgroundColor: "#F1F2F7"}}>
            </Box>
            <Stack direction="row" spacing={2}>
                <Box sx={{flexGrow: 1}}>
                    <Typography>Recent Activities</Typography>
                    <Box sx={{border: 1, borderColor: 'gray', p: 4, backgroundColor: "#F1F2F7"}}>
                    </Box>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Typography>Next Step</Typography>
                    <Box sx={{border: 1, borderColor: 'gray', p: 4, backgroundColor: "#F1F2F7"}}>
                    </Box>
                </Box>
            </Stack>

        </Box>
    </>
}