import {useApplication, useOrganization} from "@/features/organization/orgHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import OrganizationEmpty from "@/features/organization/components/OrganizationEmpty.tsx";
import OrganizationPending from "@/features/organization/components/OrganizationPending.tsx";
import OrganizationRejected from "@/features/organization/components/OrganizationRejected.tsx";
import {Typography} from "@mui/material";
import OrganizationOverview from "@/features/organization/components/OrganizationOverview.tsx";

export default function Organization() {
    const {data: application, isLoading: applicationLoading} = useApplication();
    const {data: organization, isLoading: organizationLoading} = useOrganization();

    if (organizationLoading || applicationLoading) {
        return <Loading/>;
    }

    if (!application) {
        return <OrganizationEmpty/>;
    }

    switch (application.applicationStatus) {
        case "PENDING":
            return <OrganizationPending application={application}/>;

        case "REJECTED":
            return <OrganizationRejected application={application}/>

        case "APPROVED":
            if (!organization) {
                return <Typography>Error! Organization data not found.</Typography>;
            }

            return <OrganizationOverview organization={organization}/>;

        default:
            return (<Typography color="error">
                Unknown application status: {application.applicationStatus}
            </Typography>);
    }
}