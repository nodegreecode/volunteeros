import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box,
    Button,
} from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

interface OrganizationPendingProps {
    application: {
        id: number;
        organizationForm: string;
        organizationName: string;
        applicationStatus: string;
        description: string;
        memberRole: string;
        submittedAt: string;
        reviewedAt: string;
    }
    onApplyingAgain: () => void;
}

export default function OrganizationRejected({application, onApplyingAgain}: OrganizationPendingProps) {

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
                        maxWidth: 500,
                        mx: "auto",
                        mt: 4,
                    }}
                >
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <PendingActionsIcon color="warning"/>

                                <Typography variant="h6">Application Rejected</Typography>
                            </Stack>

                            <Typography>
                                Organization:
                                <strong> {application.organizationName}</strong>
                            </Typography>
                            <Chip
                                label={application.applicationStatus}
                                color="error"
                                sx={{
                                    width: "fit-content",
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Submitted:
                                {new Date(application.submittedAt).toLocaleDateString()}
                            </Typography>

                            <Typography variant="body2">
                                Your organization application was rejected. Please review the
                                feedback and submit again.
                            </Typography>

                            <Button variant="contained" onClick={onApplyingAgain}>
                                Apply Again
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
