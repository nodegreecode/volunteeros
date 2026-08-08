import {Card, CardContent, Typography, Chip, Stack, Box} from "@mui/material";

interface OrganizationPendingProps {
    id: number;
    organizationForm: string;
    organizationName: string;
    applicationStatus: string;
    description: string;
    memberRole: string;
    submittedAt: string;
    reviewedAt: string;
}

import PendingActionsIcon from "@mui/icons-material/PendingActions";

export default function OrganizationPending({application}) {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    height: "100%",
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        mx: "auto",
                        mt: 4,
                    }}
                >
                    <CardContent sx={{textAlign: "center"}}>
                        <Stack spacing={1}  sx={{alignItems: "center"}}>
                            <Typography variant="h5">Application submitted</Typography>
                            <Typography>
                                Your application is under review
                            </Typography>
                            <Typography>
                                Status
                            </Typography>
                            <Chip
                                label={application.applicationStatus}
                                color="warning"
                                sx={{
                                    width: "40%",
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Submitted:
                                {new Date(application.submittedAt).toLocaleDateString()}
                            </Typography>


                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
