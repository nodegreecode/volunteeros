import {Box, Card, CardContent, CardMedia, Divider, Drawer, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ProjectEventsDrawer({
                                                open,
                                                events,
                                                onClose,
                                            }) {


    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box sx={{width: 500, p: 3}}>
                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Typography variant="h5" sx={{mb: 3}}>
                    Project Events
                </Typography>

                {events?.map(prEvent => (
                    <Card key={prEvent.id} sx={{mb: 2}}>
                        <CardContent>
                            <Box>
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                >
                                    {prEvent.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{mt: 0.5}}
                                >
                                    Event details
                                </Typography>
                            </Box>
                            <Divider sx={{mb: 3}}/>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{mb: 2}}
                            >
                                Event Information
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
                                        {prEvent.status}
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
                                        {prEvent.location}
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
                                        {prEvent.startDate}
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
                                        {prEvent.endDate}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{mb: 3}}/>

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
                                {prEvent.description || "No description available."}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Drawer>
    )
        ;
}