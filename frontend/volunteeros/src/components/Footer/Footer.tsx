import { Box, Typography, Divider, Link, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          positon: "relative",
          overflow: "hidden",
          bgcolor: "#0f172a",
          color: "white",
          py: 8,
          px: { xs: 3, md: 8 },

          background: `
          radial-gradient(circle at top left, rgba(255,255,255,.05), transparent 35%),
          radial-gradient(circle at bottom right, rgba(255,255,255,.04), transparent 35%),
          #0f172a
        `,
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,

            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
          }}
        >
          <Box>
            <Typography variant="h5">VolunteerOS</Typography>

            <Typography color="grey.400">
              Connecting volunteers with organizations to create stronger,
              kinder communities through meaningful opportunities.
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ mb: 2 }}>Quick Links</Typography>

            <Stack spacing={1}>
              <Link color="inherit" underline="hover">
                Home
              </Link>
              <Link color="inherit" underline="hover">
                About
              </Link>
              <Link color="inherit" underline="hover">
                Opportunities
              </Link>
              <Link color="inherit" underline="hover">
                Organizations
              </Link>
              <Link color="inherit" underline="hover">
                Contact
              </Link>
            </Stack>
          </Box>

          <Box>
            <Typography sx={{ mb: 2 }}>Contact</Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <EmailIcon fontSize="small" />
                <Typography>hello@volunteeros.com</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <PhoneIcon fontSize="small" />
                <Typography>+1 234 567 890</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <LocationOnIcon fontSize="small" />
                <Typography>Berlin, Germany</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Typography sx={{ mb: 2 }}>Contact</Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <EmailIcon fontSize="small" />
                <Typography>hello@volunteeros.com</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <PhoneIcon fontSize="small" />
                <Typography>+1 234 567 890</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <LocationOnIcon fontSize="small" />
                <Typography>Berlin, Germany</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2",
            }}
          >
            <Typography color="grey.500">
              © 2026 VolunteerOS. All rights reserved.
            </Typography>

            <Stack direction="row" spacing={3}>
              <Link color="inherit" underline="hover">
                Privacy Policy
              </Link>

              <Link color="inherit" underline="hover">
                Terms of Service
              </Link>

              <Link color="inherit" underline="hover">
                Cookies
              </Link>
            </Stack>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,.12)", mb: 3 }} />
      </Box>
    </>
  );
}
