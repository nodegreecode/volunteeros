import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

interface OrganizationEmptyProps {
    onCreate: () => void;
}

export default function OrganizationEmpty({onCreate}: OrganizationEmptyProps) {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 600,
                    width: "100%",
                    borderStyle: "dashed",
                    borderColor: "grey.400",
                    backgroundColor: "grey.50",
                }}
            >
                <CardContent>
                    <Stack
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                        sx={{py: 5}}
                    >
                        <Button
                            variant="outlined"
                            onClick={onCreate}
                            sx={{
                                minWidth: 56,
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                fontSize: "2rem",
                                lineHeight: 1,
                            }}
                        >
                            +
                        </Button>

                        <Typography variant="h6">Create your organization</Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                        >
                            Start by submitting an application to create or join an
                            organization.
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
