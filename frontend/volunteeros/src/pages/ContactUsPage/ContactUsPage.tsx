import {Box, Typography} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function ContactUsPage() {
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
                Contact Us Page
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500 }}>
                This page is currently under development. Soon you'll be able to massage
                us via email if you have some feedbacks or questions.
            </Typography>
        </Box>
    );
}