import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({
  message = "Loading...",
  fullScreen = false,
}: LoadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          minHeight: fullScreen ? "100vh" : 300,
        }}
      >
        <CircularProgress />

        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}
