import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip, Menu, MenuItem,
    Paper,
    Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow,
    Typography
} from "@mui/material";
import {Link, useNavigate, useParams, Outlet} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {type ChangeEvent, useState} from "react";
import {
    useEditProject,
    useProjectEvents,
    useSingleProject,
    useUploadProjectImage
} from "@/features/organization/orgHooks.ts";
import {useFormik} from "formik";
import Loading from "@/components/common/Loading.tsx";
import ProjectDetailsTabs from "@/features/organization/components/ProjectDetailsTabs/ProjectDetailsTabs.tsx";

const getStatusColor = (status) => {
    switch (status) {
        case "ACTIVE":
            return "success";
        case "PENDING_MODERATION":
            return "warning"; // orange
        case "CANCELLED":
            return "error"; // red
        default:
            return "default";
    }
}

const getEventStatusColor = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "info";
        case "CHECK_IN":
            return "warning";
        case "IN_PROGRESS":
            return "primary";
        case "COMPLETED":
            return "success";
        case "CANCELLED":
            return "error";
        default:
            return "default";
    }
}

const statusLabels = {
    ACTIVE: "Active",
    PENDING_MODERATION: "Pending",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

const eventStatusLabels = {
    PUBLISHED: "Published",
    CHECK_IN: "Check-In",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export default function ProjectDetailsLayout() {

    const {id} = useParams();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const {data: project, isLoading: isLoadingProject} = useSingleProject(Number(id));

    const {mutate: uploadImage, isPending: isPendingProjectImage} = useUploadProjectImage();

    const {mutate: editProject, isPending: isUpdatingProject} = useEditProject();

    const {data: events = [], isLoading: isLoadingEvents, isError, error} = useProjectEvents(Number(id));

    const formik = useFormik({
        initialValues: {
            title: project?.title ?? "",
            location: project?.location ?? "",
            description: project?.description ?? "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            editProject(
                {
                    projectId: id,
                    values: {
                        title: values.title,
                        description: values.description,
                        location: values.location,
                    },
                },
                {
                    onSuccess: () => {
                        setIsEditing(false);
                    },
                },
            );
        }
    })

    if (isLoadingProject || isLoadingEvents) {
        return <Loading/>
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        uploadImage({
            projectId: Number(id),
            image: file
        });
    }

    const paginatedEvents = events.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    function handleEdit() {
        if (isEditing) {
            formik.handleSubmit();
        } else {
            setIsEditing(true);
        }
    }

    return <>
        <Box>
            <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center", mb: 4}}>
                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center"
                }}>
                    <Typography variant="h5" component="h2">{project.title}</Typography>
                    <Chip color={getStatusColor(project.status)}
                          label={statusLabels[project.status]}
                          size="small"/>
                </Box>
                <Button variant="contained" component={Link} to="create-event" startIcon={<AddIcon/>}>New Event</Button>
            </Stack>

            <Card sx={{mb: 2, backgroundColor: "#F1F2F7"}}>
                <CardHeader sx={{px: {xs: 2, md: 3}, py: 2.5,}}
                            title={<Typography variant="h6" fontWeight={600}> Project information </Typography>}
                            action={<Button variant={isEditing ? "contained" : "outlined"}
                                            startIcon={isEditing ? <SaveIcon/> : <EditIcon/>}
                                            onClick={handleEdit}
                                            disabled={isUpdatingProject}> {isEditing ? "Save changes" : "Edit"} </Button>}/>

                <CardContent>
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: {xs: "1fr", md: "180px 1fr",},
                            gap: {xs: 3, md: 4},
                            alignItems: "start",
                        }}>
                            {/* AVATAR / IMAGE */}
                            <Stack spacing={1.5} sx={{justifyContent: "center", alignItems: "center"}}>
                                <Avatar src={project?.image?.secureUrl}
                                        sx={{width: 120, height: 120, fontSize: 40, borderRadius: 2}}>
                                    P
                                </Avatar>
                                <Button component="label"
                                        variant="text"
                                        size="small"
                                        disabled={isPendingProjectImage}>
                                    {isPendingProjectImage ? "Uploading..." : "Change image"}
                                    <input type="file" hidden accept="image/*" onChange={handleImageChange}/>
                                </Button>
                            </Stack>
                            {/* FORM FIELDS */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {xs: "1fr", sm: "repeat(2, minmax(0, 1fr))",},
                                    gap: 2.5,
                                }}>
                                <TextField label="Project title" name="title" value={formik.values.title}
                                           onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth
                                           disabled={!isEditing}/> <TextField label="Location" name="location"
                                                                              value={formik.values.location}
                                                                              onChange={formik.handleChange}
                                                                              onBlur={formik.handleBlur} fullWidth
                                                                              disabled={!isEditing}/>
                                <TextField
                                    label="Description" name="description" value={formik.values.description}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} multiline rows={4}
                                    fullWidth
                                    disabled={!isEditing} sx={{gridColumn: {xs: "auto", sm: "1 / -1",},}}/>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <ProjectDetailsTabs/>
            <Outlet/>
        </Box>
    </>
}