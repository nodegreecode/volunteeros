import {Box, Grid, Paper} from "@mui/material";
import savingOcean from "@/assets/ocg-saving-the-ocean.jpg";
import LoginForm from "@/features/auth/components/LoginForm/LoginForm.tsx";

export default function LoginPage() {
    return (
        <>
            <Box sx={{minHeight: "100vh"}}>
                <Grid container sx={{minHeight: "100vh"}} spacing={0}>
                    {/* IMAGE */}
                    <Grid
                        size={{xs: 0, md: 6}}
                        sx={{display: {xs: "none", md: "block"}}}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                backgroundImage: `url(${savingOcean})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </Grid>

                    {/* LOGIN FORM */}
                    <Grid
                        size={{xs: 12, md: 6}}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "100%",
                                p: 4,
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    width: "100%",
                                    maxWidth: 620,
                                }}
                            >
                                <LoginForm/>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
