import { Box, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function SkillsPage() {
  return (
    <>
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
          Skills Page
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500 }}>
          This volunteers page is currently under development. Soon you'll be
          able to browse volunteer opportunities, track your participation, and
          manage your volunteer activities all in one place.
        </Typography>
      </Box>
    </>
  );
}
