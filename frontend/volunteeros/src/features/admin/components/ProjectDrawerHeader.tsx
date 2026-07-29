import { Box, Typography, Chip, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface ProjectDrawerHeaderProps {
  title: string;
  status: string;
  onClose: () => void;
}
const statusConfig: Record<
  string,
  { label: string; color: "default" | "success" | "warning" | "error" | "info" }
> = {
  DRAFT: {
    label: "Draft",
    color: "default",
  },
  PENDING_MODERATION: {
    label: "Pending Moderation",
    color: "warning",
  },
  ACTIVE: {
    label: "Active",
    color: "success",
  },
  COMPLETED: {
    label: "Completed",
    color: "info",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "error",
  },
};

export default function ProjectDrawerHeader({
  title,
  status,
  onClose,
}: ProjectDrawerHeaderProps) {
  const config = statusConfig[status] ?? {
    label: status,
    color: "default" as const,
  };

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
        <Typography variant="h6">Project title: {title}</Typography>
        <Chip color={config.color} label={config.label} size="small" />
      </Box>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
