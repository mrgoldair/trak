import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./components/auth/useAuth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
