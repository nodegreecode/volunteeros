import {Box, Drawer, Card, IconButton,  Divider, Typography, CardContent, CardMedia} from "@mui/material";
import {useState, useEffect} from "react";

import type {Participant} from "@/features/organization/components/Participants/ParticipationTable";
import {useUpdateParticipationStatus} from "@/features/organization/orgHooks.ts";
import CloseIcon from "@mui/icons-material/Close";

type ParticipantDrawerProps = {
    open: boolean;
    project: Project;
    onClose: () => void;
};

enum ParticipationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
}

export function ProjectDetailsDrawer({
                                         open,
                                         project,
                                         onClose,
                                     }: ParticipantDrawerProps) {

    const [currentParticipant, setCurrentParticipant] =
        useState<Participant | null>(project);

    useEffect(() => {
        setCurrentParticipant(project);
    }, [project]);

    const {mutate: updateParticipationStatus, isPending} =
        useUpdateParticipationStatus();

    function handleStatusUpdate(
        participantId: number,
        status: ParticipationStatus,
    ) {
        updateParticipationStatus(
            {
                participationId: participantId,
                status: status,
            },
            {
                onSuccess: () => {
                    setCurrentParticipant((prev) =>
                        prev
                            ? {
                                ...prev,
                                status,
                            }
                            : prev,
                    );
                },
            },
        );
    }

    return (
        <>
            <Drawer anchor="right" open={open} onClose={onClose}>
                <Box sx={{width: 700, p: 3,}}>
                    {project && (
                        <>
                            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                                <IconButton onClick={onClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </Box>
                            <Card>
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

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mt: 0.5 }}
                                            >
                                                Project details
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ mb: 3 }} />
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                            sx={{ mb: 2 }}
                                        >
                                            Project Information
                                        </Typography>
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

                                        <Divider sx={{ mb: 3 }} />

                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                            sx={{ mb: 1.5 }}
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
                        </>
                        )}
                </Box>
            </Drawer>
        </>
);
}
