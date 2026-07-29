import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  TextField,
  CardMedia,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import beachCleaning from "@/assets/ocg-saving-the-ocean2.jpg";
import { Link } from "react-router-dom";
import type { ProjectCreateResponseDto } from "@/features/organization/orgTypes.ts";
import { useEditProject } from "@/features/organization/orgHooks";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ProjectEditFormValues {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  requiredVolunteers: number;
}

type OrganizationProjectsOverviewProps = {
  projects: ProjectCreateResponseDto[];
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  requiredVolunteers: Yup.number()
    .min(1, "At least 1 volunteer required")
    .required("Required volunteers is required"),
});

export default function OrganizationProjectsOverview({
  projects,
}: OrganizationProjectsOverviewProps) {
  const { mutate: editProject, isPending } = useEditProject();

  const [selectedProject, setSelectedProject] = useState(null);

  function handleClose() {
    setSelectedProject(null);
  }

  const formik = useFormik<ProjectEditFormValues>({
    initialValues: {
      title: selectedProject?.title ?? "",
      description: selectedProject?.description ?? "",
      location: selectedProject?.location ?? "",
      startDate: selectedProject?.startDate?.slice(0, 16) ?? "",
      endDate: selectedProject?.endDate?.slice(0, 16) ?? "",
      requiredVolunteers: selectedProject?.requiredVolunteers ?? 0,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!selectedProject) return;

      editProject(
        {
          projectId: selectedProject.id,
          values: {
            title: values.title,
            description: values.description,
            location: values.location,
            startDate: new Date(values.startDate).toISOString(),
            endDate: new Date(values.endDate).toISOString(),
            requiredVolunteers: values.requiredVolunteers,
          },
        },
        {
          onSuccess: () => {
            handleClose();
          },
        },
      );
    },
  });

  return (
    <Box
      sx={{
        padding: "2rem",
      }}
    >
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Button component={Link} to="create" variant="contained">
            Create new project
          </Button>
        </Box>
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid
              item
              size={{
                xs: 12,
                md: 6,
                lg: 4,
              }}
              key={project.id}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  padding: "10px",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>

                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      marginBottom: "16px",
                    }}
                    image={beachCleaning}
                  />

                  {/* Project metadata chips */}
                  <Stack
                    direction={{ lg: "column", xl: "row" }}
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2 }}
                  >
                    <Chip
                      icon={<DateRangeIcon />}
                      label={`${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        px: 2,
                      }}
                    />

                    <Chip
                      icon={<LocationOnIcon />}
                      label={project.location}
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{
                        px: 2,
                      }}
                    />
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSelectedProject(project)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
      {/* Edit Project Dialog */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Project</DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Project title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              margin="normal"
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              margin="normal"
            />

            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              margin="normal"
            />

            <TextField
              fullWidth
              type="datetime-local"
              label="Start date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              helperText={formik.touched.startDate && formik.errors.startDate}
              margin="normal"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              fullWidth
              type="datetime-local"
              label="End date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
              margin="normal"
            />

            <TextField
              fullWidth
              type="number"
              label="Required volunteers"
              name="requiredVolunteers"
              value={formik.values.requiredVolunteers}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.requiredVolunteers &&
                Boolean(formik.errors.requiredVolunteers)
              }
              helperText={
                formik.touched.requiredVolunteers &&
                formik.errors.requiredVolunteers
              }
              margin="normal"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
