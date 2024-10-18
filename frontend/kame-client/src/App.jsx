import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import DataEntryHome from "./pages/DataEntryHome"
import LandingPage from "./pages/LandingPage"
import VitalSignsPage from "./pages/VitalSingPage"
import NoPage from "./pages/NoPage"
import MedicalRecordPage from "./pages/MedicalRecordPage"
import RegisterPatient from "./pages/RegisterPatient"
import MedicalHistoryPage from "./pages/MedicalHistoryPage"
import CreateMedicalRecord from "./pages/CreateMedicalRecord"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/home" element={<DataEntryHome />} />
          <Route path="/home/:patientId" element={<MedicalRecordPage />} />
          <Route path="/home/register-patient" element={<RegisterPatient />}/>
          <Route path="/home/:patient_id/create-vitals" element={<VitalSignsPage />} />
          <Route path="/home/:patiend_id/create-history" element={<MedicalHistoryPage />} />
          <Route path="/home/:patient_id/create-record" element={<CreateMedicalRecord />} />
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
