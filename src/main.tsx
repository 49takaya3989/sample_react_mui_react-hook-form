import React from "react"
import ReactDOM from "react-dom/client"
import MuiRhfWithRegister from "./MUI+RHF_with_register/index.tsx"
import { CssBaseline } from "@mui/material";
import "./index.css"

import MuiRhfWithController from './MUI+RHF_with_controller/index.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    MuiRhfWithRegister
    <MuiRhfWithRegister />
    <br />
    <br />
    <br />
    MuiRhfWithController
    <MuiRhfWithController />
  </React.StrictMode>,
)
