import {
    Box,
    Chip,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import { useNavigate, useOutletContext} from "react-router-dom";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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


export default function ProjectEvents() {
    const events = useOutletContext();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function handleClose() {
        setSelectedEvent(null);
    }

    function handleMenuOpen(event, project) {
        setAnchorEl(event.currentTarget);
        setSelectedEvent(project);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        setSelectedEvent(null);
    }

    const paginatedEvents = events.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );


    return <>
        <Box>
            {/* Events */}
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
                            {paginatedEvents.map((project) => (
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
                    <MenuItem onClick={handleMenuClose}>View</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                </Menu>
            </Paper>
        </Box>

    </>
}