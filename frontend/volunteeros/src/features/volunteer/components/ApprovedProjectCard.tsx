import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import ProjectDetailsDialog from "@/features/volunteer/components/ProjectDetailsDialog";

export default function ApprovedProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">{project.title}</Typography>

          <Typography>{project.orgName}</Typography>

          <Stack mt={2} spacing={1}>
            <Chip label="Approved" color="success" />

            <Typography>📍 {project.location}</Typography>

            <Typography>
              📅
              {new Date(project.startDate).toLocaleDateString()}-
              {new Date(project.endDate).toLocaleDateString()}
            </Typography>
          </Stack>
        </CardContent>

        <CardActions>
          <Button variant="contained" onClick={() => setOpen(true)}>
            View Project
          </Button>
        </CardActions>
      </Card>

      <ProjectDetailsDialog
        open={open}
        project={project}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
