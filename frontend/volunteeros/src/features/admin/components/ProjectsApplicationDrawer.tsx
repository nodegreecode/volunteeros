import { Drawer, Box, Typography, Stack, Button, Chip } from "@mui/material";
import type { OrganizationApplicationResponseDto } from "@/features/admin/adminTypes.ts";



interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  requiredVolunteers: string;
  createdAt: string;
}

interface ProjectsApplicationDrawerProps {
  open: boolean;
  onClose: () => void;
  project: Project;
  onApprove: () => void;
  onReject: () => void;
}

const statusLabelColor: Record<string, "warning" | "error" | "success"> = {
  PENDING_MODERATION: "warning",
  CANCELLED: "error",
  ACTIVE: "success",
};

export default function ProjectsApplicationDrawer({
  open,
  project,
  onClose,
  onApprove,
  onReject,
}: ProjectsApplicationDrawerProps) {
  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 500,
            p: 3,
          }}
        >
          <Typography variant="h5">{project?.title}</Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Chip
              label={project?.status}
              color={statusLabelColor[project?.status] || "default"}
            />
            <Typography>Description: {project?.description}</Typography>
            <Typography>Created: {project?.createdAt}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
            <Button color="error" variant="outlined" onClick={onReject}>
              Reject
            </Button>
            <Button color="success" variant="contained" onClick={onApprove}>
              Approve
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
