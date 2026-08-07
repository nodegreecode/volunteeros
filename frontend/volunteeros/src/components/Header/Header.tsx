import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {useLogout} from "@/features/auth/authHooks.ts";
import {useProfile} from "@/features/auth/authHooks.ts";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useMatches} from "react-router-dom";



export default function Header({drawerOpen, toggleDrawer}) {

    const matches = useMatches();

    const navigate = useNavigate();

    const {data: user, isLoading} = useProfile();

    const isAuthenticated = !!user;

    const logoutMutation = useLogout();

    const title = matches.map(match => match.handle?.title)
        .filter(Boolean)
        .pop() || "VolunteerOS";

    /*function handleLogout() {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate("/auth/login");
            },
        });
    }*/

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
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {isAuthenticated && (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={toggleDrawer}
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="h1">
                                {title}
                            </Typography>
                        </>
                    )}
                </Box>
                {!isAuthenticated && (
                    <Button
                        component={Link}
                        to={isAuthenticated ? "/app" : "/"}
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
                )}
                {/* Navigation Links */}
                {!isLoading && !isAuthenticated && (
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
                )}

                {/* Right Buttons */}
                {/*!isLoading && !isAuthenticated ? (
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
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                        data-testid="logout-button"
                    >
                        LogOut
                    </Button>
                )*/}
                {
                    !isLoading && !isAuthenticated && (<Box
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
                    </Box>)
                }
            </Toolbar>
        </AppBar>
    );
}
