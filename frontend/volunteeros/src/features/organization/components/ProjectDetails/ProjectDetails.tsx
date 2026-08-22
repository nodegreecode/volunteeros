import {useOutletContext} from "react-router-dom"
import {
    Chip,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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


export default function ProjectDetails() {

    const events = useOutletContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const paginatedEvents = events.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

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