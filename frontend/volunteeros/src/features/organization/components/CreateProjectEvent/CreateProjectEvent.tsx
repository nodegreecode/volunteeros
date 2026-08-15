import {useNavigate, useParams} from "react-router-dom";
import { useCreateProjectEvent} from "@/features/organization/orgHooks.ts";
import {useFormik} from "formik";
import type {ProjectCreateRequest} from "@/features/organization/orgApi.ts";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";

export interface ProjectEventCreateRequest {
    title: string;
    description?: string;
    date: string;       // LocalDate → "YYYY-MM-DD"
    startTime: string;  // LocalTime → "HH:mm:ss"
    endTime?: string;   // LocalTime → "HH:mm:ss"
    location?: string;
    capacity?: number;
}

export default function CreateProjectEvent() {

    const {id} = useParams();

    const navigate = useNavigate();

    const createProjectEvent = useCreateProjectEvent();

    const formik = useFormik<ProjectCreateRequest>({
        initialValues: {
            title: "",
            description: "",
            date: "",
            startTime: "",
            endTime: "",
            location: "",
            capacity: 1,
        },
        onSubmit: async (values) => {
            await createProjectEvent.mutateAsync({
                projectId: Number(id),
                values: {
                    ...values,
                    startDate: new Date(values.date).toISOString(),
                },
            });

            navigate(`/app/organization/projects/${id}`);
        },
    });

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Create Project Event
            </Typography>
            <Card
                elevation={2}
                sx={{
                    px: 3,
                    py: 3,
                }}
            >
                <CardContent>
                    <Box component="form" onSubmit={formik.handleSubmit}>

                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: {xs: "1fr", md: "repeat(2, minmax(0, 1fr))",},
                            gap: {xs: 3, md: 4},
                            alignItems: "start",
                        }}>

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
                                label="Location"
                                fullWidth
                                margin="normal"
                                name="location"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <TextField
                                label="Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                name="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                            <TextField
                                label="Capacity"
                                type="number"
                                fullWidth
                                margin="normal"
                                name="requiredVolunteers"
                                value={formik.values.requiredVolunteers}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                inputProps={{min: 1}}
                            />
                            <TextField
                                label="Start Time"
                                type="time"
                                fullWidth
                                margin="normal"
                                name="startTime"
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                            <TextField
                                label="End Time"
                                type="time"
                                fullWidth
                                margin="normal"
                                name="endTime"
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                sx={{gridColumn: {xs: "auto", sm: "1 / -1",},}}
                                margin="normal"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
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
                                disabled={createProjectEvent.isPending}
                            >
                                {createProjectEvent.isPending ? "Creating..." : "Create Project Event"}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}