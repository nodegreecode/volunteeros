import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import {NavLink} from "react-router-dom";

export default function OrganizationEmpty() {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 600,
                    width: "100%",
                    borderColor: "grey.400",
                    backgroundColor: "grey.50",
                }}
            >
                <CardContent>
                    <Stack
                        spacing={2}
                        sx={{
                            py: 5,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Typography variant="h4">You don't have an organization yet</Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                        >
                            Start by submitting an application to create or join an
                            organization.
                        </Typography>
                        <Button
                            component={NavLink}
                            variant="contained"
                            to="create-organization"
                        >
                            Register my organization
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
