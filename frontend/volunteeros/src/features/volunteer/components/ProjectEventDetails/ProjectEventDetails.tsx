import {NavLink, useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Button,
    Card, CardActions,
    CardContent,
    CardMedia,
    Chip, Collapse,
    LinearProgress, Menu, MenuItem,
    Paper,
    Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow,
    Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    useRegistrationQrCode,
    useSingleProjectEvent,
    useSingleProjectEventRegistration, useWithdrawEventParticipation
} from "@/features/volunteer/volHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";

export default function ProjectEventDetails() {
    const navigate = useNavigate();

    const {projectEventId} = useParams();

    const [showActions, setShowActions] = useState(false);

    const {data: event, isLoading: isLoadingEvent} = useSingleProjectEvent(Number(projectEventId));

    const {
        data: registration,
        isLoading: isLoadingRegistration
    } = useSingleProjectEventRegistration(Number(projectEventId));

    const {
        data: qrCode,
        isLoading: isLoadingQrCode,
        refetch: fetchQrCode
    } = useRegistrationQrCode(Number(registration?.id));

    const {mutate: cancelRegistartion, isPending: isCancelingRegistration} = useWithdrawEventParticipation();

    if (isLoadingEvent || isLoadingRegistration) {
        return <Loading/>
    }

   async function handleWithdraw() {
        await cancelRegistartion(Number(registration?.id));
    }

    async function handleQrCode() {
        await fetchQrCode();
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
                <Typography variant="body2" color="textSecondary" component="div">{event.title}</Typography>
            </Stack>

            <Card sx={{backgroundColor: "#F1F2F7"}}>
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h6" sx={{fontWeight: 600, flex: 1}}>{event.title}</Typography>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </Stack>
                </CardContent>

                <Divider/>

                <CardContent sx={{py: 2}}>
                    <Stack direction="row" spacing={8}>
                        <Stack spacing={1}>
                            <Typography variant="caption" color="text.secondary">Start Date</Typography>
                            <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                                {new Date(event.startDate).toLocaleDateString()}
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="caption" color="text.secondary">Start Date</Typography>
                            <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                                {new Date(event.endDate).toLocaleDateString()}
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="caption" color="text.secondary">Status</Typography>
                            <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                                <Chip label={event.status} color="success"/>
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="caption" color="text.secondary">Location</Typography>
                            <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                                {event.location}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>

                <Divider/>

                <CardContent sx={{display: "flex", justifyContent: "center", py: 1}}>
                    <Button
                        size="small"
                        onClick={() => setShowActions((prev) => !prev)}
                        endIcon={
                            showActions ? <ExpandLessIcon/> : <ExpandMoreIcon/>
                        }
                        sx={{textTransform: "none", color: "inherit"}}
                    >
                        {showActions ? "Hide Details" : "View Details"}
                    </Button>
                </CardContent>

                <Collapse in={showActions}>

                    <CardContent>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Description
                        </Typography>

                        <Typography variant="body2">
                            {event.description}
                        </Typography>
                        {qrCode && !isLoadingQrCode && (<Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                            <Box
                                component="img"
                                src={`data:image/png;base64,${qrCode.qrCodeBase64}`}
                                alt="QR Code"
                                sx={{width: 160, height: 160}}
                            />
                        </Box>)}


                    </CardContent>


                    <Divider/>

                    <CardActions sx={{justifyContent: "flex-end", px: 2, pb: 2}}>
                        <Button variant="contained"
                                onClick={handleWithdraw}
                                disabled={event.status !== "PUBLISHED" || !registration || registration.status !== "REGISTERED" || isCancelingRegistration}
                        >
                            Withdraw
                        </Button>
                        <Button variant="outlined"
                                disabled={event.status !== "PUBLISHED" || isLoadingQrCode || !registration || registration.status !== "REGISTERED"}
                                onClick={handleQrCode}
                        >
                            {isLoadingQrCode ? "Loading..." : "QR Code"}
                        </Button>
                    </CardActions>
                </Collapse>
            </Card>

        </Box>

    </>
}