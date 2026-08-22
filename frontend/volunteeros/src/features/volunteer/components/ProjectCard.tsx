import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Stack,
    Chip, Box, Collapse,
} from "@mui/material";
import {

    useApplyForProject,
} from "@/features/volunteer/volHooks.ts";


import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

type ProjectCardProps = {
    project: {
        id: number;
        title: string;
        description: string;
        organizationName: string;
        imageUrl?: string;
        location: string;
        startDate: string;
        endDate: string;
        requiredVolunteers: number;
    };
};

export default function ProjectCard({project}: ProjectCardProps) {

    const [showActions, setShowActions] = useState(false);

    const {mutate: applyForProject, isPending} = useApplyForProject();

    const [, setSearchParams] = useSearchParams();

    function handleApplyForProject() {
        applyForProject({projectId: project.id});
    }

    const handleViewDetails = () => {
        setSearchParams({
            projectId: String(project.id),
        });
    };

    const handleViewEvents = () => {
        setSearchParams({
            eventsProjectId: String(project.id),
        });
    };

    return (
        <Card sx={{backgroundColor: "#F1F2F7"}}>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    {project.image?.secureUrl ?
                        (<Box component="img"
                              src={project.image.secureUrl}
                              alt={project.title}
                              sx={{
                                  width: 80,
                                  height: 60,
                                  borderRadius: 1,
                                  objectFit: "cover",
                                  flexShrink: 0,
                              }}/>) :
                        (<Box
                            sx={{
                                width: 80,
                                height: 60,
                                borderRadius: 1,
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "action.hover",
                            }}>
                            <ImageOutlinedIcon fontSize="large" color="disabled"/>
                        </Box>)}

                    <Typography variant="h6" sx={{fontWeight: 600, flex: 1}}>{project.title}</Typography>
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
                            {new Date(project.startDate).toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">Start Date</Typography>
                        <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                            {new Date(project.endDate).toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">Status</Typography>
                        <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                            <Chip label="Approved" color="success"/>
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">Location</Typography>
                        <Typography sx={{fontSize: "1.1rem", fontWeight: 600}}>
                            {project.location}
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
                        {project.description}
                    </Typography>
                </CardContent>


                <Divider/>

                <CardActions sx={{justifyContent: "flex-end", px: 2, pb: 2}}>
                    <Button variant="contained"
                            onClick={handleApplyForProject}
                    >
                        Apply
                    </Button>
                    <Button variant="outlined"
                            onClick={handleViewDetails}
                    >
                        Details
                    </Button>
                    <Button variant="outlined"
                            onClick={handleViewEvents}
                    >
                        Events
                    </Button>
                </CardActions>
            </Collapse>
        </Card>


    );
}
