import imagePlaceholder from "@/assets/ny-menghor.jpg";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";

type ProjectCardProps = {
  project: {
    id: number;
    title: string;
    description: string;
    organizationName: string;
    imageUrl?: string;
    location: string;
    startDate: string;
    endDate: string;
    requiredVolunteers: number;
  };

  onApply: (id: number) => void;
  isApplying: boolean;
};

export default function ProjectCard({
  project,
  onApply,
  isApplying,
}: ProjectCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        width="100%"
        height="180"
        image={project.imageUrl ?? imagePlaceholder}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {project.title}
        </Typography>

        <Typography variant="subtitle2" color="primary">
          {project.organizationName}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {project.description.length > 120
            ? project.description.substring(0, 120) + "..."
            : project.description}
        </Typography>

        <Stack spacing={1} sx={{ mt: 3 }}>
          <Chip icon={<LocationOnIcon />} label={project.location} />

          <Chip
            icon={<CalendarMonthIcon />}
            label={`${new Date(project.startDate).toLocaleDateString()}
 ${new Date(project.endDate).toLocaleDateString()}`}
          />
          <Chip
            icon={<GroupsIcon />}
            label={`${project.requiredVolunteers} volunteers needed`}
          />
        </Stack>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onApply(project.id)}
          disabled={isApplying}
        >
          Apply
        </Button>
      </CardActions>
    </Card>
  );
}
