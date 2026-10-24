import {useState} from "react";
import type {Organization, OrganizationApplicationResponseDto} from "@/features/admin/adminTypes.ts";
import Loading from "@/components/common/Loading.tsx";
import {Box, Card, Container, Divider, Stack, Tab, Tabs, Typography} from "@mui/material";
import OrganizationTable from "@/features/admin/components/OrganizationTable .tsx";
import ApplicationTable from "@/features/admin/components/ApplicationTable.tsx";
import OrganizationDrawer from "@/features/admin/components/OrganizationDrawer.tsx";
import ApplicationDrawer from "@/features/admin/components/ApplicationDrawer/ApplicationDrawer.tsx";
import {
    useApproveOrganizationApplication,
    useOrganizationApplications,
    useRejectOrganizationApplication
} from "@/features/organization-application/orgApplicationHooks.ts";
import {useOrganizations} from "@/features/organization/orgHooks";

export default function Organizations() {
    const {organizations, isLoading} = useOrganizations();
    const {pendingApplications, isLoading: isLoadingApplications} = useOrganizationApplications();

    const approveOrganizationApplication = useApproveOrganizationApplication();

    const rejectOrganizationApplication = useRejectOrganizationApplication();

    const [tab, setTab] = useState(0);
    const [selectedApplication, setSelectedApplication] =
        useState<OrganizationApplicationResponseDto | null>(null);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(null);

    if (isLoading || isLoadingApplications) {
        return <Loading/>;
    }

    function handleApproveOrganizationApplication() {

        if (!selectedApplication) {
            return;
        }

        setSelectedApplication((prev) =>
            prev ? {...prev, applicationStatus: "APPROVED"} : null,
        );

        approveOrganizationApplication.mutate({
            applicationId: selectedApplication.id
        })
    }

    function handleRejectOrganizationApplication() {

        if (!selectedApplication) {
            return;
        }

        setSelectedApplication((prev) =>
            prev ? {...prev, applicationStatus: "REJECTED"} : null,
        );

         rejectOrganizationApplication.mutate({
            applicationId: selectedApplication.id
        })
    }

    return (
        <>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <Box>
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
                            onApprove={handleApproveOrganizationApplication}
                            onReject={handleRejectOrganizationApplication}
                        />
                    )}
                </Stack>
            </Container>
        </>
    );
}