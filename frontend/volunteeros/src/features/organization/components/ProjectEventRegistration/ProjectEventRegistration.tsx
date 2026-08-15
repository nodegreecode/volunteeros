import {
    Button,
    Chip, Menu, MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Box
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useProjectEventRegistrations, useStartCheckIn} from "@/features/organization/orgHooks";
import Loading from "@/components/common/Loading.tsx";
import {useOutletContext} from "react-router-dom";

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

export default function ProjectEventRegistration() {

    const {id} = useParams();

    const {data: registrations, isLoading} = useProjectEventRegistrations(Number(id));

    const {mutate: startCheckIn, isPending: isStartingCheckIn} = useStartCheckIn();

    const navigate = useNavigate();
    const projectEvents = [1, 2, 3, 4, 5];
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProjectEvent, setSelectedProjectEvent] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const event = useOutletContext();

    if (isLoading) {
        return <Loading/>;
    }

    const paginatedEventRegistrations = registrations.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    function handleCheckIn() {
        startCheckIn(Number(id));
    }

    function handleMenuOpen() {

    }

    function handleMenuClose() {

    }

    return <>
        <Box sx={{p: 2}}>
            <Box sx={{display: "flex", justifyContent: "flex-end", mb: 2}}>
                <Button variant="contained"
                        component={Link}
                        to="../check-in"
                        color="success"
                        onClick={handleCheckIn}
                        disabled={event.status !== "PUBLISHED" || !registrations?.length || isStartingCheckIn}>Check-In</Button>
            </Box>
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
                    count={projectEvents.length}
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
    </>
}