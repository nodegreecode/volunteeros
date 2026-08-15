import {Link, useParams} from "react-router-dom"
import {
    Avatar,
    Button,
    Card,
    CardContent, CardHeader, Chip, Menu, MenuItem, Paper,
    Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {Box} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {type ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
    useEditProject,
    useProjectEvents,
    useSingleProject,
    useUploadProjectImage
} from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import {useNavigate} from "react-router-dom";

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


export default function ProjectDetailsPage() {

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

            <Typography variant="h5" component="h2" sx={{mb: 2}}>
                All Events
            </Typography>
            <Paper variant="outlined" sx={{backgroundColor: "#F1F2F7"}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedEvents.map((prEvent) => (
                                <TableRow key={prEvent.id}
                                          hover
                                          onClick={() => navigate(`events/${prEvent.id}`)}
                                          sx={{cursor: "pointer"}}>
                                    <TableCell>{prEvent.title}</TableCell>
                                    <TableCell>{prEvent.location}</TableCell>
                                    <TableCell>
                                        <Chip label={eventStatusLabels[prEvent.status]}
                                              size="small"
                                              color={getEventStatusColor(prEvent.status)}
                                              variant="contained"
                                              sx={{
                                                  px: 2,
                                              }}/>
                                    </TableCell>
                                    <TableCell>{new Date(prEvent.date).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="proejct actions"
                                        >
                                            <MoreVertIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={events.length}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
                    <MenuItem>View</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </Paper>
        </Box>
    </>
}