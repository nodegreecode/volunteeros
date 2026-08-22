import {useProjectParticipants} from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import {useParams} from "react-router-dom";
import {
    Chip, Menu, MenuItem,
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

export function ProjectParticipants() {
    const {projectId} = useParams();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const {
        data: projectParticipants,
        isLoading: isLoadingProjectParticipants,
        isError,
        error
    } = useProjectParticipants(Number(projectId));

    if (isLoadingProjectParticipants) {
        return <Loading/>;
    }

    const paginatedProjectParticipants = projectParticipants.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return <>
        <Paper variant="outlined" sx={{backgroundColor: "#F1F2F7"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Joined</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProjectParticipants.map((participant) => (
                            <TableRow key={participant.id}
                                      hover
                                      onClick={() => navigate(`events/${participant.id}`)}
                                      sx={{cursor: "pointer"}}>
                                <TableCell>{participant.volunteerFirstName}</TableCell>
                                <TableCell>{participant.volunteerLastName}</TableCell>
                                <TableCell>
                                    <Chip label={eventStatusLabels[participant.status]}
                                          size="small"
                                          color={getEventStatusColor(participant.status)}
                                          variant="contained"
                                          sx={{
                                              px: 2,
                                          }}/>
                                </TableCell>
                                <TableCell>{new Date(participant.joinedAt).toLocaleDateString()}</TableCell>
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
                count={projectParticipants.length}
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