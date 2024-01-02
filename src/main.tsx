import React from "react"
import ReactDOM from "react-dom/client"
import MuiRhf from "./MUI+RHF_with_register/index.tsx"
import { CssBaseline } from "@mui/material";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    MuiRhf
    <MuiRhf />
  </React.StrictMode>,
)
