import { BrowserRouter } from "react-router-dom";
import { useAuth } from "@/features/auth/authHooks.ts";
import Router from "./router";

function App() {
  useAuth();
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
