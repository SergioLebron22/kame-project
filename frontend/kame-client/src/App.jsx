import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import DataEntryHome from "./pages/DataEntryHome"
import LandingPage from "./pages/LandingPage"
import VitalSignsPage from "./pages/VitalSingPage"
import NoPage from "./pages/NoPage"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
          <Route path="/auth/login" element={<LoginPage />}/>
          <Route path="/home/" element={<DataEntryHome />} />
          <Route path="/home/:patient_id/create_vitals/" element={<VitalSignsPage />} />
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
