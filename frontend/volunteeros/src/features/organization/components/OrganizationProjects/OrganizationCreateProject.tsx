import {Box, Button, TextField, Typography, Card} from "@mui/material";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {
    useCreateProject,
    useOrganization,
} from "@/features/organization/orgHooks";
import type {ProjectCreateRequest} from "@/features/organization/orgApi";

export default function OrganizationCreateProject() {
    const navigate = useNavigate();
    const {data: organization} = useOrganization();

    const createProject = useCreateProject();

    const formik = useFormik<ProjectCreateRequest>({
        initialValues: {
            title: "",
            description: "",
            location: "",
            startDate: "",
            endDate: "",
            requiredVolunteers: 1,
        },

        onSubmit: async (values) => {
            await createProject.mutateAsync({
                organizationId: organization.id,
                values: {
                    ...values,
                    startDate: new Date(values.startDate).toISOString(),
                    endDate: new Date(values.endDate).toISOString(),
                },
            });

            navigate("/app/organization/projects");
        },
    });

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                mt: 4,
            }}
        >
            <Card
                elevation={2}
                sx={{
                    px: 3,
                    py: 3,
                    backgroundColor: "#F1F2F7"
                }}
            >
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{width: "100%", maxWidth: 600}}
                    mx="auto"
                >
                    <Typography variant="h4" mb={3}>
                        Create Project
                    </Typography>

                    <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <TextField
                        label="Location"
                        fullWidth
                        margin="normal"
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <TextField
                        label="Start Date"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />

                    <TextField
                        label="End Date"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />

                    <TextField
                        label="Required Volunteers"
                        type="number"
                        fullWidth
                        margin="normal"
                        name="requiredVolunteers"
                        value={formik.values.requiredVolunteers}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        inputProps={{min: 1}}
                    />

                    <Box mt={3} sx={{display: "flex", gap: 2}}>
                        <Button
                            variant="contained"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={createProject.isPending}
                        >
                            {createProject.isPending ? "Creating..." : "Create Project"}
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
