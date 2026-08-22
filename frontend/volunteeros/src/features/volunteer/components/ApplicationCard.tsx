import {
    Stack,
    Card,
    Typography,
    Chip,
    Button,
    CardActions,
    CardContent,
    Collapse,
} from "@mui/material";

import type {ProjectParticipationResponseDto} from "@/features/volunteer/volTypes";
import {useWithdrawParticipation} from "@/features/volunteer/volHooks.ts";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";

type ApplicationCardProps = {
    application: ProjectParticipationResponseDto;
};


export default function ApplicationCard({application}: ApplicationCardProps) {
    const {mutate: withdraw, isPending} = useWithdrawParticipation();

    const [showActions, setShowActions] = useState(false);

    const canWithdraw = application.status === "PENDING";

    function handleWithdraw(participationId: string) {
        withdraw({participationId});
    }

    return (
        <Card sx={{backgroundColor: "#F1F2F7"}}>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h6" sx={{fontWeight: 600, flex: 1}}>{application.projectTitle}</Typography>
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
                            {new Date(application.joinedAt).toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">Start Date</Typography>
                        <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                            {new Date(application.joinedAt).toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">Status</Typography>
                        <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                            <Chip label={application.status} color="success"/>
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">Organization</Typography>
                        <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                            {application.organizationName}
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
                       Description
                    </Typography>
                </CardContent>


                <Divider/>

                <CardActions sx={{justifyContent: "flex-end", px: 2, pb: 2}}>
                    {canWithdraw && (
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={() => handleWithdraw(application.id)}
                            disabled={isPending}
                        >
                            Withdraw
                        </Button>
                    )}
                    <Button variant="outlined"
                    >
                        Details
                    </Button>
                    <Button variant="outlined"

                    >
                        Events
                    </Button>
                </CardActions>
            </Collapse>
        </Card>
    );
}
