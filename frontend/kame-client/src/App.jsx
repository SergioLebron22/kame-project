import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import DataEntryHome from "./pages/DataEntryHome"
import LandingPage from "./pages/LandingPage"
import VitalSignsPage from "./pages/VitalSingPage"
import NoPage from "./pages/NoPage"
import AdminPage from "./pages/AdminPage"
import EmployeeCreation from "./pages/RegisterEmployeePage"
import MedicalRecordPage from "./pages/MedicalRecordPage"
import EmployeesList from "./components/EmployeesOnShift"
import EditEmployee from "./pages/EditEmployeesPage"
import MedicalHistoryPage from "./pages/MedicalHistoryPage"
// import CreateMedicalRecord from "./pages/CreateMedicalRecord"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
          <Route path="/dashboard" element={<AdminPage />}/>
          <Route path="/dashboard/register-employee" element={<EmployeeCreation />}/>
          <Route path="/auth/login" element={<LoginPage />}/>
          <Route path="/dashboard/employees" element={<EmployeesList />}/>
          <Route path="/edit-employee/:employee_id" element={<EditEmployee />}/>
          <Route path="/home/" element={<DataEntryHome />} />
          <Route path="/home/:patientId" element={<MedicalRecordPage />} />
          {/* <Route path="/home/create-medical-record/" element={<CreateMedicalRecord />} /> */}
          <Route path="/home/:patient_id/create_vitals/" element={<VitalSignsPage />} />
          <Route path="/home/:patiend_id/create_history" element={<MedicalHistoryPage />} />
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
