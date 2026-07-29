import { Box, Typography, Chip, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface DrawerHeaderProps {
  orgName: string;
  onClose: () => void;
}

export default function DrawerHeader({ orgName, onClose }: DrawerHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 3,
      }}
    >
      <Box>
        <Typography variant="h6">Organization name: {orgName}</Typography>
        <Chip color="success" label="Approved" size="small" />
      </Box>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
