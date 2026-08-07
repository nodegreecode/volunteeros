import Stepper from "@mui/material/Stepper";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useState} from "react";
import {Stack, Box, Button, Card, CardContent, Typography} from "@mui/material";
import GeneralInformationStep
    from "@/features/organization/components/GeneralInformationStep/GeneralInformationStep.tsx";
import {useProfile} from "@/features/auth/authHooks.ts";
import {useApplyApplication} from "@/features/organization/orgHooks.ts";
import {type FormikHelpers, useFormik} from "formik";
import type {ApplicationRequestDto} from "@/features/organization/orgApi.ts";
import AddressStep from "@/features/organization/components/ AddressStep/ AddressStep.tsx";
import ContactStep from "@/features/organization/components/ContactStep/ContactStep.tsx";
import ReviewStep from "@/features/organization/components/ReviewStep/ReviewStep.tsx";
import * as Yup from "yup";

const stepLabels = [
    "General information",
    "Address details",
    "Contact details",
    "Submit",
];

const OrganizationApplicationSchema = Yup.object({
    organizationForm: Yup.string().required("Please select organization form"),
    organizationName: Yup.string().required("Please enter organization name"),
    description: Yup.string().required("Please enter description"),
    memberRole: Yup.string().required("Please select your role"),
    phone: Yup.string().required("Please enter phone number"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email address")
        .max(254, "Must be max 254 characters"),
    website: Yup.string().required("Please enter  website"),
    registrationCountry: Yup.string().required("Please enter  registration country"),
    city: Yup.string().required("Please enter  city"),
    street: Yup.string().required("Please enter  street"),
    registrationNumber: Yup.string().required("Please enter  registration number"),
});

const steps = [GeneralInformationStep, AddressStep, ContactStep, ReviewStep];

export default function CreateOrganizationPage() {

    const {data: user} = useProfile();

    const applyMutation = useApplyApplication();

    const [activeStep, setActiveStep] = useState(0);

    const [errorMessage, setErrorMessage] = useState();

    function handleNext() {
        console.log("Next clicked");
        setActiveStep((prev) => prev + 1);
    }

    function handleBack() {
        setActiveStep((prev) => prev - 1);
    }

    const StepComponent = steps[activeStep];

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
        validationSchema: OrganizationApplicationSchema,
        validateOnBlur: true,
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

    return <>
        <Box sx={{width: "100%", display: "flex", justifyContent: "flex-start"}}>
            <Stack sx={{width: "100%", maxWidth: 900}} spacing={3}>
                <Typography variant="body2" color="text.secondary" component="h3">
                    Register an organization
                </Typography>
                <Stepper activeStep={activeStep}>
                    {
                        stepLabels.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
                <Card>
                    <CardContent sx={{p: 4}}>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 4}}>
                            <StepComponent formik={formik}/>
                            <Box sx={{display: "flex", gap: 2, mt: 4}}>
                                <Button variant="contained" type="button" onClick={handleBack}
                                        disabled={activeStep === 0}>Back</Button>
                                <Button type="submit" variant="contained"
                                        sx={{display: activeStep === steps.length - 1 ? "inline-flex" : "none"}}>Submit</Button>
                                <Button variant="contained" type="button"
                                        sx={{display: activeStep === steps.length - 1 ? "none" : "inline-flex"}}
                                        onClick={handleNext}>Next</Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    </>
}