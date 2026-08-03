import {useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import Stack from "@mui/material/Stack";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import {type FormikHelpers, useFormik} from "formik";
import {
    type SignupFormValues,
    type RegisterRequestPayload,
} from "@/features/auth/types.ts";
import * as Yup from "yup";
import {useRegister} from "@/features/auth/authHooks.ts";

const SignUpSchema = Yup.object({
    firstName: Yup.string()
        .required("Please enter your first name")
        .min(2, "Must be min 2 characters"),
    lastName: Yup.string()
        .required("Please enter your last name")
        .min(2, "Must be min 2 characters"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email address")
        .max(254, "Must be max 254 characters"),
    password: Yup.string()
        .required("Please enter your password")
        .min(12, "Must be min 12 characters")
        .max(50, "Must be max 50 characters"),
    passwordConfirmation: Yup.string()
        .nullable()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    role: Yup.string().required("Please select an account type"),
});

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const registrationMutation = useRegister();

    const formik = useFormik<SignupFormValues>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            role: "",
        },
        validationSchema: SignUpSchema,
        onSubmit: async (values, helper: FormikHelpers<SignupFormValues>) => {
            const payload: RegisterRequestPayload = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                role: values.role,
            };

            try {
                await registrationMutation.mutateAsync(payload);
                setSuccessMessage("Registration completed successfully.");
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
            <Paper elevation={0} sx={{width: "100%"}}>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                        <Typography variant="h4" align="left">
                            Please register to continue
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    label="First Name"
                                    type="text"
                                    name="firstName"
                                    fullWidth
                                    required
                                    autoComplete="given-name"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                        formik.touched.firstName && formik.errors.firstName,
                                    )}
                                    helperText={
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    label="Last Name"
                                    type="text"
                                    name="lastName"
                                    fullWidth
                                    required
                                    autoComplete="family-name"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                        formik.touched.lastName && formik.errors.lastName,
                                    )}
                                    helperText={
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            fullWidth
                            required
                            autoComplete="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            required
                            autoComplete="new-password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.password && formik.errors.password,
                            )}
                            helperText={formik.touched.password && formik.errors.password}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                                aria-label={
                                                    showPassword ? "Hide password" : "Show password"
                                                }
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            name="passwordConfirmation"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            required
                            onChange={formik.handleChange}
                            value={formik.values.passwordConfirmation}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.passwordConfirmation &&
                                formik.errors.passwordConfirmation,
                            )}
                            helperText={
                                formik.touched.passwordConfirmation &&
                                formik.errors.passwordConfirmation
                            }
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                                aria-label={
                                                    showPassword ? "Hide password" : "Show password"
                                                }
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <FormControl
                            error={Boolean(formik.touched.role && formik.errors.role)}
                        >
                            <FormLabel>Account Type</FormLabel>

                            <RadioGroup
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                sx={{flexDirection: "row"}}
                            >
                                <FormControlLabel
                                    value="ROLE_VOLUNTEER"
                                    control={<Radio/>}
                                    label="Volunteer"
                                />

                                <FormControlLabel
                                    value="ROLE_ORGANIZATION"
                                    control={<Radio/>}
                                    label="Organization"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            type="submit"
                            disabled={registrationMutation.isPending}
                        >
                            Sign Up
                        </Button>
                        <Divider></Divider>
                        <Typography align="center">Already have an account?{" "}
                            <Link
                                component={RouterLink}
                                to="/auth/login"
                                underline="none"
                            >
                                Log in
                            </Link>
                        </Typography>

                    </Stack>
                </Box>
            </Paper>

            <Snackbar
                open={Boolean(successMessage)}
                autoHideDuration={4000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert
                    severity="success"
                    onClose={() => setSuccessMessage(null)}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={4000}
                onClose={() => setErrorMessage(null)}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert
                    severity="error"
                    onClose={() => setErrorMessage(null)}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
