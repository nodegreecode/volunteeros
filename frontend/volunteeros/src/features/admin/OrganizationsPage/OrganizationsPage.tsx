import {
    Box,
    Typography,
    Container,
    Stack,
    Card,
    Tabs,
    Tab,
    Divider,
} from "@mui/material";
import {useState} from "react";
import OrganizationTable from "@/features/admin/components/OrganizationTable .tsx";
import OrganizationDrawer from "@/features/admin/components/OrganizationDrawer.tsx";
import Loading from "@/components/common/Loading.tsx";
import ApplicationDrawer from "@/features/admin/components/ApplicationDrawer/ApplicationDrawer";
import ApplicationTable from "@/features/admin/components/ApplicationTable";
import type {Organization} from "@/features/admin/adminTypes.ts";
import type {OrganizationApplicationResponseDto} from "@/features/admin/adminTypes.ts";
import {
    useApplicationUpdateStatus,
    useOrganizations,
    usePendingApplicaitons,
} from "@/features/admin/adminHooks";

export default function OrganizationsPage() {
    const {organizations, isLoading} = useOrganizations();
    const {pendingApplications, isLoading: isLoadingApplications} = usePendingApplicaitons();

    const updateApplicationStatusMutation = useApplicationUpdateStatus();

    const [tab, setTab] = useState(0);
    const [selectedApplication, setSelectedApplication] =
        useState<OrganizationApplicationResponseDto | null>(null);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(null);

    if (isLoading || isLoadingApplications) {
        return <Loading/>;
    }

    function handleStatusUpdate(status: "APPROVED" | "REJECTED") {
        if (!selectedApplication) {
            return;
        }

        setSelectedApplication((prev) =>
            prev ? {...prev, applicationStatus: status} : null,
        );

        updateApplicationStatusMutation.mutate({
            applicationId: selectedApplication.id,
            status,
        });
    }

    return (
        <>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h4">Organizations</Typography>

                        <Typography color="text.secondary">
                            Manage organizations and review applications
                        </Typography>
                    </Box>

                    <Card>
                        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
                            <Tab label="Organizations"/>
                            <Tab label="Applications"/>
                        </Tabs>

                        <Divider/>

                        {tab === 0 && (
                            <OrganizationTable
                                organizations={organizations}
                                onSelect={setSelectedOrganization}
                            />
                        )}

                        {tab === 1 && (
                            <ApplicationTable
                                applications={pendingApplications}
                                onSelect={setSelectedApplication}
                            />
                        )}
                    </Card>

                    <OrganizationDrawer
                        open={!!selectedOrganization}
                        organization={selectedOrganization}
                        onClose={() => setSelectedOrganization(null)}
                    />
                    {selectedApplication && (
                        <ApplicationDrawer
                            open={!!selectedApplication}
                            application={selectedApplication}
                            onClose={() => setSelectedApplication(null)}
                            onApprove={() => handleStatusUpdate("APPROVED")}
                            onReject={() => handleStatusUpdate("REJECTED")}
                        />
                    )}
                </Stack>
            </Container>
        </>
    );
}
