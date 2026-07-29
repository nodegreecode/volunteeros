import { Card, CardContent, Typography, Stack } from "@mui/material";
import InfoRow from "@/features/admin/components/InfoRow.tsx";

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

interface ProjectInfoCardProps {
  project: Project;
}

export default function ProjectInfoCard({ project }: ProjectInfoCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Organization Information
        </Typography>
        <Stack spacing={2}>
          <InfoRow label="Description: " value={project.description} />
          <InfoRow label="Address: " value={project.location} />
          <InfoRow
            label="Start date: "
            value={new Date(project.startDate).toLocaleDateString()}
          />
          <InfoRow
            label="End date: "
            value={new Date(project.endDate).toLocaleDateString()}
          />
          <InfoRow
            label="Created: "
            value={new Date(project.createdAt).toLocaleDateString()}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
