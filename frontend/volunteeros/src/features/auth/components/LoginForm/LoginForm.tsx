//import { v4 } from "uuid";
import * as Yup from "yup";
import { useState } from "react";
import { type FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import { useLogin } from "@/features/auth/authHooks.ts";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface LoginRequestPayload {
  email: string;
  password: string;
}

const LoginSchema = Yup.object({
  email: Yup.string().required("Please enter your email address"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const formik = useFormik<LoginRequestPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, helper: FormikHelpers<LoginRequestPayload>) => {
      try {
        await loginMutation.mutateAsync(values);
        navigate("/dashboard");
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
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ p: 4 }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h4" align="left">
                Login
              </Typography>

              <TextField
                label="Email"
                type="text"
                name="email"
                fullWidth
                required
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                fullWidth
                required
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                disabled={loginMutation.isPending}
              >
                Login
              </Button>
              <Divider sx={{ my: 1 }}>OR</Divider>
              <Stack spacing={2} direction="row">
                <Button
                  component={RouterLink}
                  to="/auth/signup"
                  variant="outlined"
                  fullWidth
                >
                  SignUp
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={4000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setErrorMessage(null)}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
