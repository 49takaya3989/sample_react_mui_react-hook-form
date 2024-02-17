import React from "react"
import ReactDOM from "react-dom/client"
import { CssBaseline } from "@mui/material";
import "./index.css"

// import MuiRhfWithRegister from "./MUI+RHF_with_register/index.tsx"
// import MuiRhfWithController from './MUI+RHF_with_controller/index.tsx';
import MuiRhfWithControllerAndZod from './MUI+RHF_with_controller_and_zod/index.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    {/* MuiRhfWithRegister
    <MuiRhfWithRegister />
    <br />
    <br />
    <br />
    MuiRhfWithController
    <MuiRhfWithController />
    <br />
    <br />
    <br /> */}
    MuiRhfWithControllerAndZod
    <MuiRhfWithControllerAndZod />
  </React.StrictMode>,
)
