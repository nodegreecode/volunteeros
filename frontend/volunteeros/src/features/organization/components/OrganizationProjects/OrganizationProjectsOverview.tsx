import {useState} from "react";
import {
    Box,
    Chip,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Menu,
    MenuItem,
    TablePagination
} from "@mui/material";
import {useOutletContext} from "react-router-dom";
import {useEditProject} from "@/features/organization/orgHooks";
import {useFormik} from "formik";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useNavigate} from "react-router-dom";


interface ProjectEditFormValues {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    requiredVolunteers: number;
}

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

const statusLabels = {
    ACTIVE: "Active",
    PENDING_MODERATION: "Pending",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export default function OrganizationProjectsOverview() {

    const projects = useOutletContext();

    const navigate = useNavigate();

    const {mutate: editProject, isPending} = useEditProject();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function handleClose() {
        setSelectedProject(null);
    }

    function handleMenuOpen(event, project) {
        setAnchorEl(event.currentTarget);
        setSelectedProject(project);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        setSelectedProject(null);
    }

    function handleTotalParticipants() {
        return projects.reduce((acc, project) => {
            return (
                acc +
                project.participations.filter((participation) => participation.status === "APPROVED").length
            )
        }, 0);
    }

    const paginatedProjects = projects.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

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
        <Box>
            {/* Projects */}
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
                            {paginatedProjects.map((project) => (
                                <TableRow key={project.id}
                                          hover
                                          onClick={() => navigate(`${project.id}`)}
                                          sx={{cursor: "pointer"}}>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>{project.location}</TableCell>
                                    <TableCell>
                                        <Chip label={statusLabels[project.status]}
                                              size="small"
                                              color={getStatusColor(project.status)}
                                              variant="contained"
                                              sx={{
                                                  px: 2,
                                              }}/>
                                    </TableCell>
                                    <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="proejct actions"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleMenuOpen(event, project);
                                                    }}>
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
                    count={projects.length}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>View</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                </Menu>
            </Paper>
        </Box>

    );
}
