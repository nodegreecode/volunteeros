import {useState} from "react";
import {Box, Card, Container, Divider, Stack, Tab, Tabs} from "@mui/material";
import ApplicationList from "@/features/volunteer/components/ApplicationList.tsx";
import ApprovedProjectList from "@/features/volunteer/components/ApprovedProjectList.tsx";

export default function MyProjects() {
    const [tab, setTab] = useState(0);

    return (
        <Container maxWidth="xl">
            <Stack spacing={3}>

                <Card>
                    <Tabs value={tab} onChange={(_, value) => setTab(value)}>
                        <Tab label="Applications" />
                        <Tab label="Approved Projects" />
                    </Tabs>

                    <Divider />

                    <Box sx={{ p: 3 }}>
                        {tab === 0 && <ApplicationList />}
                        {tab === 1 && <ApprovedProjectList />}
                    </Box>
                </Card>

            </Stack>
        </Container>
    );
}