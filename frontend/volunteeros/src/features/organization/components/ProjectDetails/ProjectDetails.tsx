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


export default function ProjectDetails() {

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
    </>
}