import savingOcean from "@/assets/ocg-saving-the-ocean.jpg";
import { Box, Grid, Paper, Stack } from "@mui/material";
import SignUpForm from "@/features/auth/components/SigUpForm/SigUpForm.tsx";

export default function SignUpPage() {
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container sx={{ minHeight: "100vh" }} spacing={0}>
          {/* LOGIN FORM */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack spacing={3}>
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
                  <SignUpForm />
                </Paper>
              </Box>
            </Stack>
          </Grid>

          {/* IMAGE */}
          <Grid
            size={{ xs: 0, md: 6 }}
            sx={{ display: { xs: "none", md: "block" } }}
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
        </Grid>
      </Box>
    </>
  );
}
