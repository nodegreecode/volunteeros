import savingOcean from "@/assets/ocg-saving-the-ocean.jpg";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import SignUpForm from "@/features/auth/components/SigUpForm/SigUpForm.tsx";
import LoginForm from "@/features/auth/components/LoginForm/LoginForm.tsx";
import { useLocation } from "react-router-dom";
const MotionBox = motion(Box);

export default function AuthPageDeprecated() {
  const location = useLocation();

  const modeState: string = location.pathname.endsWith("signup")
    ? "signup"
    : "login";

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDE*/}
      <MotionBox
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundImage: `url(${savingOcean})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 2,
        }}
        animate={{
          x: modeState === "login" ? "0%" : "100%", // moves RIGHT when switching to signup
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* RIGHT SIDE */}
      <MotionBox
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        animate={{
          x: modeState === "login" ? "0%" : "-100%", // form goes LEFT when switching
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <MotionBox
            key={modeState}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{
              opacity: {
                duration: 0.4,
                ease: "easeIn",
              },
            }}
          >
            {modeState === "login" ? <LoginForm /> : <SignUpForm />}
          </MotionBox>
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
}
