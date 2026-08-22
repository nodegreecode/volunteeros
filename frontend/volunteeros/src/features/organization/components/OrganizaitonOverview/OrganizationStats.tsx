import {Grid, Card, CardContent, Typography, Box} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import type {Organization} from "@/features/admin/adminTypes.ts";

export default function OrganizationStats({organization,}: { organization: Organization; }) {
    const stats = [
        {
            title: "Total Projects",
            value: 24,
            change: 12.5,
            icon: <FolderIcon fontSize="large"/>,
        },
        {
            title: "Total Volunteers",
            value: 56,
            change: 8.2,
            icon: <PeopleIcon fontSize="large"/>,
        },
        {
            title: "Total Events",
            value: 234,
            change: -3.4,
            icon: <EventIcon fontSize="large"/>,
        },
    ];

    return (
        <Grid container spacing={3} sx={{mb: 5}}>
            {stats.map((stat) => (
                <Grid size={{xs: 12, sm: 6, md: 4}} key={stat.title}>
                    <Card sx={{backgroundColor: "#F1F2F7"}}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">
                                {stat.title}
                            </Typography>
                            <Typography variant="h4" sx={{mt: 1, fontWeight: 600}}>
                                {stat.value}
                            </Typography>
                            <Box sx={{display: "flex", gap: 0.5, alignItems: "center"}}>
                                {stat.change >= 0 ? <TrendingUpIcon color="success"/> :
                                    <TrendingDownIcon color="error"/>
                                }

                                <Typography variant="body2" fontWeight={600}>
                                    {Math.abs(stat.change)}%
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    vs last month
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

