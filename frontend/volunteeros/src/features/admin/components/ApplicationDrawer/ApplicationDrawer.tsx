import { Drawer, Box, Typography, Stack, Button, Chip } from "@mui/material";
import type { OrganizationApplicationResponseDto } from "@/features/admin/adminTypes.ts";

interface ApplicationDrawerProps {
  open: boolean;
  onClose: () => void;
  application: OrganizationApplicationResponseDto;
  onApprove: () => void;
  onReject: () => void;
}

const statusLabelColor: Record<string, "warning" | "error" | "success"> = {
  PENDING: "warning",
  REJECTED: "error",
  APPROVED: "success",
};

export default function ApplicationDrawer({
  open,
  application,
  onClose,
  onApprove,
  onReject,
}: ApplicationDrawerProps) {
  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 500,
            p: 3,
          }}
        >
          <Typography variant="h5">{application?.organizationName}</Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Chip
              label={application?.applicationStatus}
              color={
                statusLabelColor[application?.applicationStatus] || "default"
              }
            />
            <Typography>Description: {application?.description}</Typography>
            <Typography>Submitted: {application?.submittedAt}</Typography>
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
