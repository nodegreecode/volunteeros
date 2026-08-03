import {useApplication, useOrganization} from "@/features/organization/orgHooks.ts";
import {useState} from "react";
import Loading from "@/components/common/Loading.tsx";
import OrganizationApplicationForm
    from "@/features/organization/components/OrganizationApplicationForm/OrganizationApplicationForm.tsx";
import OrganizationEmpty from "@/features/organization/components/OrganizationEmpty.tsx";
import OrganizationPending from "@/features/organization/components/OrganizationPending.tsx";
import OrganizationRejected from "@/features/organization/components/OrganizationRejected.tsx";
import {Typography} from "@mui/material";
import OrganizationOverview from "@/features/organization/components/OrganizationOverview.tsx";

export default function Organization() {
    const {data: application, isLoading: applicationLoading} = useApplication();
    const {data: organization, isLoading: organizationLoading} = useOrganization();

    const [showApplicationForm, setShowApplicationForm] = useState(false);

    if (organizationLoading || applicationLoading) {
        return <Loading/>;
    }

    if (showApplicationForm) {
        return (<OrganizationApplicationForm onCancel={() => setShowApplicationForm(false)}/>)
    }

    if (!application) {
        return <OrganizationEmpty onCreate={() => setShowApplicationForm(true)}/>;
    }

    switch (application.applicationStatus) {
        case "PENDING":
            return <OrganizationPending application={application}/>;

        case "REJECTED":
            return <OrganizationRejected application={application}
                                         onApplyingAgain={() => setShowApplicationForm(true)}/>

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