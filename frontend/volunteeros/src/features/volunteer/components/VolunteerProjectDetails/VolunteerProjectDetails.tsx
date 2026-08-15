import {useNavigate, useParams} from "react-router-dom";
import {type ChangeEvent, useState} from "react";
import {
    useEditProject,
    useProjectEvents,
    useSingleProject,
    useUploadProjectImage
} from "@/features/organization/orgHooks.ts";
import {useFormik} from "formik";
import Loading from "@/components/common/Loading.tsx";
import {
    Box, Card, CardContent,
    Chip, Menu, MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Typography,
    Button, Stack, LinearProgress, CardMedia

} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import {useApplyForEvent} from "@/features/volunteer/volHooks.ts";

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

const eventStatusLabels = {
    PUBLISHED: "Published",
    CHECK_IN: "Check-In",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export default function VolunteerProjectDetails() {

    const navigate = useNavigate();
    const {projectId} = useParams();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProjectEvent, setSelectedProjectEvent] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const {data: project, isLoading: isLoadingProject} = useSingleProject(Number(projectId));
    const {data: events, isLoading: isLoadingEvent} = useProjectEvents(Number(projectId));

    const {mutate: applyForEvent, isPending: isApplyingForEvent} = useApplyForEvent();

    if (isLoadingProject || isLoadingEvent) {
        return <Loading/>
    }

    const paginatedEvents = events.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    function handleMenuOpen(event, prEvent) {
        setAnchorEl(event.currentTarget);
        setSelectedProjectEvent(prEvent);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        setSelectedProjectEvent(null);
    }

    function handleViewEvent() {
        if (!selectedProjectEvent?.id) return;
        handleMenuClose();
        navigate(`project-events/${selectedProjectEvent.id}`);
    }

    function handleRegister() {
        if (!selectedProjectEvent?.id) return;
        handleMenuClose();
        applyForEvent(selectedProjectEvent.id);
    }

    function handleWithdraw() {
        if (!selectedProjectEvent?.id) return;
        handleMenuClose();
        // useEventWithdraw
    }

    return <>
        <Box>
            <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center", my: 2}} spacing={2}>
                <Button
                    variant="text"
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => navigate(-1)}
                    sx={{mb: 2}}
                >
                    Back
                </Button>
                <Typography variant="body2" color="textSecondary" component="div">{project?.title}</Typography>
            </Stack>

            <Card sx={{backgroundColor: "#F1F2F7"}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={project.image?.secureUrl}
                    sx={{objectFit: "cover"}}/>
                <CardContent>
                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                        >
                            {project.title}
                        </Typography>
                    </Box>
                    <Divider sx={{mb: 2}}/>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 2,
                            mb: 4,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Status
                            </Typography>

                            <Typography variant="body1" fontWeight={500}>
                                {project.status}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Location
                            </Typography>

                            <Typography variant="body1" fontWeight={500}>
                                {project.location}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Start Date
                            </Typography>

                            <Typography variant="body1" fontWeight={500}>
                                {project.startDate}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                End Date
                            </Typography>

                            <Typography variant="body1" fontWeight={500}>
                                {project.endDate}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{mb: 2}}/>

                    <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{mb: 1.5}}
                    >
                        Description
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            lineHeight: 1.7,
                            whiteSpace: "pre-line",
                        }}
                    >
                        {project.description || "No description available."}
                    </Typography>
                </CardContent>
            </Card>

            <Typography variant="body2" color="textSecondary" component="div" sx={{my: 2}}>Events</Typography>

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
                                          onClick={() => navigate(`project-events/${prEvent.id}`)}
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
                                        <IconButton aria-label="event actions"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleMenuOpen(event, prEvent);
                                                    }}
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
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleViewEvent}>View</MenuItem>
                    <MenuItem onClick={handleRegister} disabled={isApplyingForEvent}>Register</MenuItem>
                    <MenuItem onClick={handleWithdraw}>Withdraw</MenuItem>
                </Menu>
            </Paper>
        </Box>
    </>
}