import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import DataEntryHome from "./pages/DataEntryHome"
import LandingPage from "./pages/LandingPage"
import NoPage from "./pages/NoPage"
import MedicalRecordPage from "./pages/MedicalRecordPage"
import CreateMedicalRecord from "./pages/CreateMedicalRecord"
import RegisterPatien from "./pages/RegisterPatient"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
          <Route path="/auth/login" element={<LoginPage />}/>
          <Route path="/home/" element={<DataEntryHome />} />
          <Route path="/home/:patientId" element={<MedicalRecordPage />} />
          <Route path="/home/register-patient/" element={<RegisterPatien />}/>
          <Route path="/home/create-medical-record/" element={<CreateMedicalRecord />} />
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
