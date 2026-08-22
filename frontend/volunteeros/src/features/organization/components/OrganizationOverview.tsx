import type {Organization} from "@/features/admin/adminTypes.ts";
import OrganizationStats from "@/features/organization/components/OrganizaitonOverview/OrganizationStats.tsx";
import OrganizationDetailsCard
    from "@/features/organization/components/OrganizaitonOverview/OrganizationDetailsCard.tsx";
import EditOrganizationDialog from "@/features/organization/components/OrganizaitonOverview/EditOrganizationDialog";
import {useState} from "react";
import {Stack, Typography} from "@mui/material";
import OrganizationMembers from "@/features/organization/components/OrganizationMembers/OrganizationMembers.tsx";

export default function OrganizationOverview({organization}: { organization: Organization; }) {

    const [editOpen, setEditOpen] = useState();

    return (
        <>
            <Typography sx={{mb: 4}}>Quick Stats</Typography>

            <OrganizationStats organization={organization}/>

            <Typography variant="h5" component="h4" sx={{mb: 2}}>
                Organization Information
            </Typography>

            <Stack direction="row" spacing={2}>
                <OrganizationDetailsCard
                    organization={organization}
                    onEdit={() => setEditOpen(true)}
                />
                <OrganizationMembers/>
            </Stack>

            <EditOrganizationDialog
                open={editOpen}
                organization={organization}
                onClose={() => setEditOpen(false)}
            />
        </>
    );
}
