import {BrowserRouter, RouterProvider} from "react-router-dom";
import { useAuth } from "@/features/auth/authHooks.ts";
//import Router from "./router";

import {router} from "./router";

function App() {
  useAuth();
  return (
        <RouterProvider router={router}/>
  );
}

export default App;
