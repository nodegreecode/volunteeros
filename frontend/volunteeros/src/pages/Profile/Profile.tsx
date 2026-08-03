import {Box, Typography} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function Profile() {
    return (
        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                px: 3,
            }}
        >
            <ConstructionIcon
                sx={{
                    fontSize: 120,
                    color: "warning.main",
                    mb: 2,
                }}
            />

            <Typography variant="h3" gutterBottom>
                Profile Page
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500 }}>
                This page is currently under development. Soon you'll be able to manage
                your profile, view your activity, and update your personal information.
            </Typography>
        </Box>
    );
}