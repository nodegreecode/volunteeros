import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import {NavLink} from "react-router-dom";

interface OrganizationEmptyProps {
    onCreate: () => void;
}

export default function OrganizationEmpty({onCreate}: OrganizationEmptyProps) {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                //alignItems: "center",
                //height: "100vh",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 600,
                    width: "100%",
                    //borderStyle: "dashed",
                    borderColor: "grey.400",
                    backgroundColor: "grey.50",
                }}
            >
                <CardContent>
                    <Stack
                        spacing={2}
                        sx={{py: 5,
                            justifyContent: "center",
                            alignItems: "center"}}
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
                            //onClick={onCreate}
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
