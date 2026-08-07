import {useState} from "react";
import {
    Box,
    Button, Card, CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField, Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import {useProfile} from "@/features/auth/authHooks.ts";
import {useApplyApplication} from "@/features/organization/orgHooks.ts";
import {type FormikHelpers, useFormik} from "formik";
import type {ApplicationRequestDto} from "@/features/organization/orgApi.ts";

interface OrganizationApplicationFormProps {
    onCancel: () => void;
}

export default function OrganizationApplicationForm({onCancel}: OrganizationApplicationFormProps) {

    const [errorMessage, setErrorMessage] = useState();

    const {data: user} = useProfile();

    const applyMutation = useApplyApplication();

    const formik = useFormik({
        initialValues: {
            organizationForm: "",
            organizationName: "",
            description: "",
            memberRole: "",
            phone: "",
            email: "",
            website: "",
            registrationCountry: "",
            city: "",
            street: "",
            registrationNumber: ""
        },
        onSubmit: async (values, helper: FormikHelpers<typeof initialValues>) => {

            const payload: ApplicationRequestDto = {
                userId: user.id,
                organizationForm: values.organizationForm,
                organizationName: values.organizationName,
                description: values.description,
                memberRole: values.memberRole,

                phone: values.phone,
                email: values.email,
                website: values.website,
                registrationCountry: values.registrationCountry,
                city: values.city,
                street: values.street,
                registrationNumber: values.registrationNumber
            };

            try {
                await applyMutation.mutateAsync(payload);
                helper.resetForm();
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("Something went wrong. Please try again.");
                }
            }
        },
    });


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Card sx={{maxWidth: 600, width: "100%"}}>
                    <CardContent>
                        <Box>
                            <BusinessIcon sx={{fontSize: 60, mb: 2}} color="primary"/>

                            <Typography variant="h5">
                                You don't have an organization yet
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Submit an application to create or join an organization.
                            </Typography>
                        </Box>

                        <Box component="form" display="flex" gap={2} mt={3} onSubmit={formik.handleSubmit}>




                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={applyMutation.isPending}
                            >
                                {applyMutation.isPending ? "Submitting..." : "  Apply for Organization"}
                            </Button>
                            <Button
                                onClick={onCancel}
                                variant="contained"
                                size="large"
                            >
                                Cancel
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
