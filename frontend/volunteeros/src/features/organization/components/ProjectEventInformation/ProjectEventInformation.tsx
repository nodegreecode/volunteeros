import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useCancelProjectEvent, useCompleteProjectEvent, useEditProjectEvent} from "@/features/organization/orgHooks.ts";

export default function ProjectEventInformation() {

    const {id} = useParams();

    const [isEditing, setIsEditing] = useState(false);

    const event = useOutletContext();

    const {mutate: editProjectEvent, isPending: isUpdatingProjectEvent} = useEditProjectEvent();

    const {mutate: cancelProjectEvent, isPending: isCancelingProjectEvent} = useCancelProjectEvent();

    const {mutate: completeProjectEvent, isPending: isCompletingProjectEvent} = useCompleteProjectEvent();

    const formik = useFormik({
        initialValues: {
            title: event?.title ?? "",
            location: event?.location ?? "",
            date: event?.date ?? "",
            capacity: event?.capacity ?? "",
            startTime: event?.startTime ?? "",
            endTime: event?.endTime ?? "",
            description: event?.description ?? "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            await editProjectEvent({
                    projectEventId: event.id,
                    values: {
                        ...values,
                        date: new Date(values.date).toISOString(),
                    }
                },
                {
                    onSuccess: () => {
                        setIsEditing(false);
                    }
                });
        }
    });

    function handleEditing() {
        if (isEditing) {
            formik.handleSubmit();
        } else {
            setIsEditing(true);
        }
    }

    function handleCompleteEvent() {
        completeProjectEvent(Number(id));
    }

    return <>
        <Card>
            <CardContent sx={{p: 4}}>
                <Box sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: "#F1F2F7"
                }}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2}}>
                        <Typography variant="h5">Personal Information</Typography>
                        <Button
                            component="label"
                            variant="outlined"
                            type={isEditing ? "submit" : "button"}
                            sx={{mt: 1}}
                            onClick={handleEditing}
                            disabled={isUpdatingProjectEvent}
                        >
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                    </Box>

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                        mb: 2
                    }}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="Location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="Date"
                            name="date"
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="Capacity"
                            name="capacity"
                            type="number"
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="Start"
                            name="startTime"
                            type="time"
                            value={formik.values.startTime}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            label="End"
                            name="endTime"
                            type="time"
                            value={formik.values.endTime}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled={!isEditing}
                        />

                        <TextField
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                            sx={{gridColumn: "1/-1"}}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.description && formik.errors.description,
                            )}
                            helperText={
                                formik.touched.description && formik.errors.description
                            }
                            fullWidth
                            disabled={!isEditing}
                        />
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2}}>
                        <Button variant="contained"
                                color="error"
                                onClick={() => cancelProjectEvent(Number(event.id))}
                                disabled={isCancelingProjectEvent || event.status === "CANCELLED" || event.status === "COMPLETED"}>
                            Cancel
                        </Button>
                        <Button variant="contained"
                                color="success"
                                onClick={handleCompleteEvent}
                                disabled={event.status !== "IN_PROGRESS" || event.status === "COMPLETED" || isCompletingProjectEvent}>Complete</Button>
                    </Box>
                </Box>
            </CardContent>


        </Card>
    </>
}