import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

type Props = {
  open: boolean;
  project: any;
  onClose: () => void;
};

export default function ProjectDetailsDialog({
  open,
  project,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{project.title}</DialogTitle>
      <DialogContent
        sx={{
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Chip
            label={project.status}
            color={project.status === "ACTIVE" ? "success" : "default"}
          />
          <Typography>
            <strong>Description:</strong> {project.description}
          </Typography>
          <Typography>
            📍 Location:
            <br />
            {project.location}
          </Typography>
          <Typography>
            📅 Start:
            <br />
            {new Date(project.startDate).toLocaleString()}
          </Typography>
          <Typography>
            📅 End:
            <br />
            {new Date(project.endDate).toLocaleString()}
          </Typography>
          <Typography>
            👥 Volunteers needed:
            <br />
            {project.requiredVolunteers}
          </Typography>
          <Typography color="text.secondary">
            Created:
            <br />
            {new Date(project.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
