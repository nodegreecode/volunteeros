import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header.tsx";
import Sidebar from "@/components/Sidebar/Sidebar";
import { menuConfig } from "@/components/Sidebar/menuConfig.ts";
import { useAuth } from "@/features/auth/authHooks.ts";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";

type Role = "ROLE_ORGANIZATION" | "ROLE_VOLUNTEER" | "ROLE_ADMIN";

export default function DashboardLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  const menuItems = menuConfig[user?.roles[0] as Role] ?? [];

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            flex: 1,
          }}
        >
          <Sidebar items={menuItems} />

          <Box
            component="main"
            sx={{
              flex: 1,
              p: 3,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}
