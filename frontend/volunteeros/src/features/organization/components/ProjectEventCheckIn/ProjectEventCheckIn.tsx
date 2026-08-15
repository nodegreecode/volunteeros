import {
    Box,
    Button, Card, CardContent,
    Chip, Grid, Menu, MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, Typography
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {
    useCheckInVolunteer,
    useProjectEventRegistrations,
    useStartProjectEvent
} from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading.tsx";


const getStatusColor = (status) => {
    switch (status) {
        case "REGISTERED":
            return "info";
        case "NO_SHOW":
            return "warning";
        case "ATTENDED":
            return "success";
        case "CANCELLED":
            return "error";
        default:
            return "default";
    }
}

const statusLabels = {
    REGISTERED: "Registered",
    ATTENDED: "Attended",
    NO_SHOW: "No show",
    CANCELLED: "Cancelled",
};

export function ProjectEventCheckIn() {

    const {id} = useParams();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const event = useOutletContext();

    const {data: registrations, isLoading} = useProjectEventRegistrations(Number(id));

    const {mutate: checkInVolunteer, isPending: isCheckingInVolunteer} = useCheckInVolunteer(Number(id));

    const {mutate: startProjectEvent, isPending: isStartingProjectEvent} = useStartProjectEvent();

    if (isLoading) {
        return <Loading/>;
    }

    const paginatedEventRegistrations = registrations.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    function handleMenuOpen(event, registration) {
        setAnchorEl(event.currentTarget);
        setSelectedRegistration(registration);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        setSelectedRegistration(null);
    }

    function handleAttended() {
        const token = selectedRegistration?.qrToken;
        checkInVolunteer({qrToken: token});
    }

    function handleNoShow() {

    }

    function handleCancel() {
    }

    function handleStartEvent() {
        startProjectEvent(Number(id));
    }

    return <>
        <Box sx={{p: 2}}>
            <Box sx={{display: "flex", justifyContent: "flex-end", gap: 2, mb: 2}}>
                <Button variant="contained"
                        component={Link}
                        to="../check-in"
                        color="success"
                        startIcon={<CameraAltIcon/>}
                        disabled={event.status !== "CHECK_IN"}>
                    Scan
                </Button>
                <Button variant="contained"
                        component={Link}
                        to="../check-in"
                        color="success"
                        onClick={handleStartEvent}
                        disabled={event.status !== "CHECK_IN" || isStartingProjectEvent}>
                    Start Event
                </Button>
            </Box>

            <Grid container spacing={2} sx={{mb: 5}}>
                <Grid size={{xs: 12, sm: 6, md: 4}}>
                    <Card sx={{backgroundColor: "#F1F2F7"}}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">
                                Registered
                            </Typography>
                            <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                                20
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}}>
                    <Card sx={{backgroundColor: "#F1F2F7"}}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">
                                Checked In
                            </Typography>
                            <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                                15
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}}>
                    <Card sx={{backgroundColor: "#F1F2F7"}}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">
                                No Show
                            </Typography>
                            <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                                5
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper variant="outlined" sx={{backgroundColor: "#F1F2F7"}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Firstname</TableCell>
                                <TableCell>Lastname</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedEventRegistrations.map((registration) => (
                                <TableRow key={registration.id}
                                          hover
                                          onClick={() => navigate(`${registration.id}`)}
                                          sx={{cursor: "pointer"}}>
                                    <TableCell>{registration.volunteerFirstname}</TableCell>
                                    <TableCell>{registration.volunteerLastname}</TableCell>
                                    <TableCell>
                                        <Chip label={statusLabels[registration.status]}
                                              size="small"
                                              color={getStatusColor(registration.status)}
                                              variant="contained"
                                              sx={{
                                                  px: 2,
                                              }}/>
                                    </TableCell>
                                    <TableCell>{new Date(registration.registeredAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="proejct actions"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleMenuOpen(event, registration);
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
                    count={registrations.length}
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
                    <MenuItem onClick={handleAttended} disabled={isCheckingInVolunteer}>Attended</MenuItem>
                    <MenuItem onClick={handleNoShow}>NoShow</MenuItem>
                    <MenuItem onClick={handleCancel}>Cancel</MenuItem>
                </Menu>
            </Paper>
        </Box>
    </>
}