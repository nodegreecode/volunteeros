import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";

export default function Header() {

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                width: "100%",
                borderBottom: "1px solid #eee",
                color: "inherit",
                backgroundColor: "#fff",
            }}
        >
            <Toolbar sx={{justifyContent: "space-between"}}>
                {/* Left side */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                </Box>
                {/* Right side */}
                <Button
                    component={Link}
                    to="/"
                    variant="text"
                    color="inherit"
                    sx={{
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        VolunteerOS
                    </Typography>
                </Button>

                {/* Navigation Links */}
                <Box>
                    <Button color="inherit" href="#how-it-works">
                        How It Works
                    </Button>
                    <Button color="inherit" href="#vol-opportunities">
                        Opportunities
                    </Button>
                    <Button color="inherit" href="#categories">
                        Categories
                    </Button>
                    <Button color="inherit" href="#testimonials">
                        Testimonials
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Button component={Link} to="/auth/login" color="inherit">
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            color: "black",
                            borderRadius: 3,
                            textTransform: "none",
                        }}

                        href="#call-to-action"
                        color="inherit"
                    >
                        Get Started
                    </Button>
                </Box>

            </Toolbar>

        </AppBar>

    );
}
